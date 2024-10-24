import { Component, HostListener, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
  
})
export class RegistrationComponent implements AfterViewInit {
  private currentSlide: number = 0;
  private slides!: NodeListOf<HTMLElement>; // Use definite assignment assertion
  private totalSlides: number = 0; // Initialize to zero

  ngAfterViewInit() {
    this.slides = document.querySelectorAll<HTMLElement>('.slide');
    this.totalSlides = this.slides.length;
    this.scrollAnimation();
    this.startImageSlider(); // Start the image slider
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.scrollAnimation();
  }

  private scrollAnimation(): void {
    const boxes = document.querySelectorAll('.info__box') as NodeListOf<HTMLElement>;
    const triggerPoint = window.innerHeight / 1.3;

    boxes.forEach(box => {
      const boxTop = box.getBoundingClientRect().top;

      if (boxTop < triggerPoint) {
        box.classList.add('show');
      } else {
        box.classList.remove('show');
      }
    });
  }

  private startImageSlider(): void {
    this.showSlide(this.currentSlide);
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private showSlide(index: number): void {
    const slidesContainer = document.querySelector<HTMLElement>('.slides');
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  public nextSlide(): void { // Changed to public
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(this.currentSlide);
  }

  public prevSlide(): void { // Changed to public
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(this.currentSlide);
  }

  onMouseEnter(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.classList.add('hovered');
  }

  onMouseLeave(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('hovered');
  }

  // Add public methods for arrow clicks
  public handleNext(): void {
    this.nextSlide();
  }

  public handlePrev(): void {
    this.prevSlide();
  }
}
