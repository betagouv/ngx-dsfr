/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

/**
 * Internal imports
 */
import { NavItem, SIDE_NAV } from './side-nav.const';

@Component({
  selector: 'play-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  treeControl = new NestedTreeControl<NavItem>((node) => node.children);
  treeDataSource = new MatTreeNestedDataSource<NavItem>();
  hasChild: (_: number, node: NavItem) => boolean = (
    _: number,
    node: NavItem
  ) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.treeDataSource.data = SIDE_NAV;
  }
}
