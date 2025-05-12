import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../data/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  categories: Category[] = [];
  
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    public router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(150)
      ]],
      category: ['', Validators.required],
      content: ['', [
        Validators.required,
        Validators.maxLength(2500)
      ]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories', error);
        this.showErrorToast('Failed to load categories');
      }
    );
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.showErrorToast('Please review your post');
      return;
    }

    const formValue = this.postForm.value;
    
    // Type PostCreateInput défini dans le service
    const postData = {
      title: formValue.title,
      content: formValue.content,
      category: formValue.category
    };

    this.postService.create(postData).subscribe(
      (post) => {
        this.showSuccessToast('Post Submitted Successfully');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error submitting post', error);
        this.showErrorToast('Error submitting post');
      }
    );
  }

  // SweetAlert2 toast notifications
  private showSuccessToast(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    Toast.fire({
      icon: 'success',
      title: message
    });
  }

  private showErrorToast(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    Toast.fire({
      icon: 'error',
      title: message
    });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  // Getters pour accéder facilement aux contrôles dans le template
  get title() {
    return this.postForm.get('title');
  }

  get category() {
    return this.postForm.get('category');
  }

  get content() {
    return this.postForm.get('content');
  }
}