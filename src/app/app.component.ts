import { AfterViewInit, Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'gsap-example';
  @ViewChild('scrub') scrubElement!: ElementRef<HTMLDivElement>;
  @ViewChild('noScrub') noScrubElement!: ElementRef<HTMLDivElement>;

  @ViewChild('parent') parentElement!: ElementRef<HTMLDivElement>;
  @ViewChild('child') childElement!: ElementRef<HTMLDivElement>;
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupScrollAnimations();
    }, 200);
  }

  setupScrollAnimations() {
    gsap.fromTo(
      this.scrubElement.nativeElement,
      { transform: 'translateX(0)', backgroundColor: 'rgb(0,100,200)', filter: 'blur(0px)'},
      {
        transform: 'translateX(800px)',
        backgroundColor: 'rgb(200,0,0)',
        filter: 'blur(5px)',
        scrollTrigger: {
          trigger: this.scrubElement.nativeElement,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          markers: true,
        },
      }
    );

    gsap.fromTo(
      this.noScrubElement.nativeElement,
      { transform: 'translateX(0)', backgroundColor: 'rgb(0,100,200)'},
      {
        transform: 'translateX(800px)',
        backgroundColor: 'rgb(200,0,0)',
        scrollTrigger: {
          trigger: this.noScrubElement.nativeElement,
          start: 'top center',
          end: 'bottom center',
          scrub: false,
          markers: true,
        },
      }
    );

    gsap.fromTo(
      this.childElement.nativeElement,
      { width: '0%' },
      {
        width: '100%',
        scrollTrigger: {
          trigger: this.parentElement.nativeElement,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          markers: true,
        },
      }
    );


  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
  }
}