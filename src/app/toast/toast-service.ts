import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: any[] = [];

    showSuccessToast(msg: string) {
        this.show(msg, { classname: 'bg-success text-light' });
    }

    showErrorToast(msg: string) {
        this.show(msg, { classname: 'bg-danger text-light' });
    }

    show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
        this.toasts.push({ textOrTpl, ...options });
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }
}