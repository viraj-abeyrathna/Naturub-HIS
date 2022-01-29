import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBar {

    constructor(private snackBar: MatSnackBar) { }

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    warningSnackBar(msg: string) {
        this.snackBar.open(msg, 'Got it!', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
            panelClass: ['warning-snackbar']
        });
    }

    successSnackBar(msg: string, _duration: number) {
        this.snackBar.open(msg, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: _duration,
            panelClass: ['success-snackbar']
        });
    }

    errorSnackBar(msg: string, _duration: number) {
        this.snackBar.open(msg, 'Got it!', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: _duration,
            panelClass: ['error-snackbar']
        });
    }
}