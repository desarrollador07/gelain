import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

 
  constructor() {}

  ngOnInit(): void {}

  menuMode = "horizontal";

  topbarMenuActive: boolean;

  overlayMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  layoutMenuScroller: HTMLDivElement;

  lightMenu = true;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  resetMenu: boolean;

  menuHoverActive: boolean;

  rightPanelActive: boolean;

  rightPanelClick: boolean;

  onLayoutClick() {
      if (!this.topbarItemClick) {
          this.activeTopbarItem = null;
          this.topbarMenuActive = false;
      }

      if (!this.rightPanelClick) {
          this.rightPanelActive = false;
      }

      if (!this.menuClick) {
          if (this.isHorizontal() || this.isSlim()) {
              this.resetMenu = true;
          }

          if (this.overlayMenuActive || this.staticMenuMobileActive) {
              this.hideOverlayMenu();
          }

          this.menuHoverActive = false;
      }

      this.topbarItemClick = false;
      this.menuClick = false;
      this.rightPanelClick = false;
  }

  onMenuButtonClick(event) {
      this.menuClick = true;
      this.topbarMenuActive = false;

      if (this.isOverlay()) {
          this.overlayMenuActive = !this.overlayMenuActive;
      }
      if (this.isDesktop()) {
          this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
          this.staticMenuMobileActive = !this.staticMenuMobileActive;
      }

      event.preventDefault();
  }

  onMenuClick($event) {
      this.menuClick = true;
      this.resetMenu = false;
  }

  onTopbarMenuButtonClick(event) {
      this.topbarItemClick = true;
      this.topbarMenuActive = !this.topbarMenuActive;

      this.hideOverlayMenu();

      event.preventDefault();
  }

  onTopbarItemClick(event, item) {
      this.topbarItemClick = true;

      if (this.activeTopbarItem === item) {
          this.activeTopbarItem = null;
      } else {
          this.activeTopbarItem = item;
      }

      event.preventDefault();
  }

  onTopbarSubItemClick(event) {
      event.preventDefault();
  }

  onRightPanelButtonClick(event) {
      this.rightPanelClick = true;
      this.rightPanelActive = !this.rightPanelActive;
      event.preventDefault();
  }

  onRightPanelClick() {
      this.rightPanelClick = true;
  }

  isHorizontal() {
      return this.menuMode === "horizontal";
  }

  isSlim() {
      return this.menuMode === "slim";
  }

  isOverlay() {
      return this.menuMode === "overlay";
  }

  isStatic() {
      return this.menuMode === "static";
  }

  isMobile() {
      return window.innerWidth < 1025;
  }

  isDesktop() {
      return window.innerWidth > 1024;
  }

  isTablet() {
      const width = window.innerWidth;
      return width <= 1024 && width > 640;
  }

  hideOverlayMenu() {
      this.overlayMenuActive = false;
      this.staticMenuMobileActive = false;
  }

}
