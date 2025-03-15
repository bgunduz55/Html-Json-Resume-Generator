import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ResumeService } from '../../../../services/resume.service';

interface SkillCategory {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit, OnDestroy {
  @Input() data: SkillCategory[] = [];
  
  form: FormGroup;
  showForm = false;
  editIndex = -1;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.form = this.fb.group({
      categories: this.fb.array([])
    });
    this.subscription = new Subscription();
  }

  get categories() {
    return this.form.get('categories') as FormArray;
  }

  getCategoryForm(index: number): FormGroup {
    return this.categories.at(index) as FormGroup;
  }

  ngOnInit(): void {
    if (this.data?.length) {
      this.data.forEach(category => {
        this.categories.push(this.createCategoryForm(category));
      });
    }

    this.subscription.add(
      this.form.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(value => {
        this.resumeService.updateSkills(value.categories);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createCategoryForm(data?: SkillCategory): FormGroup {
    return this.fb.group({
      category: [data?.category || '', Validators.required],
      items: [data?.items || []]
    });
  }

  addCategory(): void {
    this.editIndex = this.categories.length;
    this.categories.push(this.createCategoryForm());
    this.showForm = true;
  }

  editCategory(index: number): void {
    this.editIndex = index;
    this.showForm = true;
  }

  deleteCategory(index: number): void {
    this.categories.removeAt(index);
  }

  saveCategory(): void {
    if (this.categories.at(this.editIndex).valid) {
      this.showForm = false;
      this.editIndex = -1;
    }
  }

  cancelEdit(): void {
    if (this.editIndex === this.categories.length - 1) {
      this.categories.removeAt(this.editIndex);
    }
    this.showForm = false;
    this.editIndex = -1;
  }

  addSkill(categoryForm: FormGroup): void {
    const items = categoryForm.get('items')?.value || [];
    items.push('');
    categoryForm.patchValue({ items });
  }

  removeSkill(categoryForm: FormGroup, index: number): void {
    const items = categoryForm.get('items')?.value || [];
    items.splice(index, 1);
    categoryForm.patchValue({ items });
  }
}
