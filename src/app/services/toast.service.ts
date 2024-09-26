import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<{ message: string; type: string } | null>(null);
  toastState = this.toastSubject.asObservable();

  show(message: string, options: { type: string; duration: number }) {
    this.toastSubject.next({ message, type: options.type });

    // Automatically hide the toast after the specified duration
    setTimeout(() => {
      this.toastSubject.next(null);
    }, options.duration);
  }
}
