import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <footer class="d-flex bg-dark flex-wrap justify-content-between align-items-center py-3 my-4 border-top fixed-bottom">
    <div class="mx-auto d-flex align-items-center">
      <a href="https://www.apple.com/it/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
      <i class="bi bi-apple"></i>
      </a>
      <span class="text-muted">© 2022 Apple Company, Inc ~ KDG</span>
    </div>
  </footer>
  `,
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
// Kevin De Girolamo's Code
