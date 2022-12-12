@Directive({ selector: 'a[routerLink],area[routerLink]', standalone: true })
export class RouterLinkWithHref implements OnChanges, OnDestroy {
  private _preserveFragment = false;
  private _skipLocationChange = false;
  private _replaceUrl = false;

  // TODO(issue/24571): remove '!'.
  @HostBinding('attr.target') @Input() target!: string;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * @see {@link UrlCreationOptions#queryParams UrlCreationOptions#queryParams}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input() queryParams?: Params | null;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * @see {@link UrlCreationOptions#fragment UrlCreationOptions#fragment}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input() fragment?: string;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * @see {@link UrlCreationOptions#queryParamsHandling UrlCreationOptions#queryParamsHandling}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input() queryParamsHandling?: QueryParamsHandling | null;
  /**
   * Passed to {@link Router#navigateByUrl Router#navigateByUrl} as part of the
   * `NavigationBehaviorOptions`.
   * @see {@link NavigationBehaviorOptions#state NavigationBehaviorOptions#state}
   * @see {@link Router#navigateByUrl Router#navigateByUrl}
   */
  @Input() state?: { [k: string]: any };
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * Specify a value here when you do not want to use the default value
   * for `routerLink`, which is the current activated route.
   * Note that a value of `undefined` here will use the `routerLink` default.
   * @see {@link UrlCreationOptions#relativeTo UrlCreationOptions#relativeTo}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input() relativeTo?: ActivatedRoute | null;

  private commands: any[] | null = null;
  private subscription: Subscription;

  // the url displayed on the anchor element.
  // @HostBinding('attr.href') is used rather than @HostBinding() because it removes the
  // href attribute when it becomes `null`.
  @HostBinding('attr.href') href: string | null = null;

  /** @internal */
  onChanges = new Subject<RouterLinkWithHref>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationStrategy: LocationStrategy
  ) {
    this.subscription = router.events.subscribe((s: Event) => {
      if (s instanceof NavigationEnd) {
        this.updateTargetUrlAndHref();
      }
    });
  }

  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the
   * `UrlCreationOptions`.
   * @see {@link UrlCreationOptions#preserveFragment UrlCreationOptions#preserveFragment}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input()
  set preserveFragment(preserveFragment: boolean | string | null | undefined) {
    this._preserveFragment = coerceToBoolean(preserveFragment);
  }

  get preserveFragment(): boolean {
    return this._preserveFragment;
  }

  /**
   * Passed to {@link Router#navigateByUrl Router#navigateByUrl} as part of the
   * `NavigationBehaviorOptions`.
   * @see {@link NavigationBehaviorOptions#skipLocationChange NavigationBehaviorOptions#skipLocationChange}
   * @see {@link Router#navigateByUrl Router#navigateByUrl}
   */
  @Input()
  set skipLocationChange(
    skipLocationChange: boolean | string | null | undefined
  ) {
    this._skipLocationChange = coerceToBoolean(skipLocationChange);
  }

  get skipLocationChange(): boolean {
    return this._skipLocationChange;
  }

  /**
   * Passed to {@link Router#navigateByUrl Router#navigateByUrl} as part of the
   * `NavigationBehaviorOptions`.
   * @see {@link NavigationBehaviorOptions#replaceUrl NavigationBehaviorOptions#replaceUrl}
   * @see {@link Router#navigateByUrl Router#navigateByUrl}
   */
  @Input()
  set replaceUrl(replaceUrl: boolean | string | null | undefined) {
    this._replaceUrl = coerceToBoolean(replaceUrl);
  }

  get replaceUrl(): boolean {
    return this._replaceUrl;
  }

  /**
   * Commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
   *   - **array**: commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
   *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
   *   - **null|undefined**: Disables the link by removing the `href`
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input()
  set routerLink(commands: any[] | string | null | undefined) {
    if (commands != null) {
      this.commands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.commands = null;
    }
  }

  /** @nodoc */
  ngOnChanges(changes: SimpleChanges): any {
    this.updateTargetUrlAndHref();
    this.onChanges.next(this);
  }
  /** @nodoc */
  ngOnDestroy(): any {
    this.subscription.unsubscribe();
  }

  /** @nodoc */
  @HostListener('click', [
    '$event.button',
    '$event.ctrlKey',
    '$event.shiftKey',
    '$event.altKey',
    '$event.metaKey'
  ])
  onClick(
    button: number,
    ctrlKey: boolean,
    shiftKey: boolean,
    altKey: boolean,
    metaKey: boolean
  ): boolean {
    if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
      return true;
    }

    if (
      (typeof this.target === 'string' && this.target != '_self') ||
      this.urlTree === null
    ) {
      return true;
    }

    const extras = {
      skipLocationChange: this.skipLocationChange,
      replaceUrl: this.replaceUrl,
      state: this.state
    };
    this.router.navigateByUrl(this.urlTree, extras);
    return false;
  }

  private updateTargetUrlAndHref(): void {
    this.href =
      this.urlTree !== null
        ? this.locationStrategy.prepareExternalUrl(
            this.router.serializeUrl(this.urlTree)
          )
        : null;
  }

  get urlTree(): UrlTree | null {
    if (this.commands === null) {
      return null;
    }
    return this.router.createUrlTree(this.commands, {
      // If the `relativeTo` input is not defined, we want to use `this.route` by default.
      // Otherwise, we should use the value provided by the user in the input.
      relativeTo: this.relativeTo !== undefined ? this.relativeTo : this.route,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: this.preserveFragment
    });
  }
}
