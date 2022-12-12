@Directive({
  selector: '[routerLink]',
  standalone: true
})
export class RouterLink implements OnChanges, OnDestroy {
  private _preserveFragment = false;
  private _skipLocationChange = false;
  private _replaceUrl = false;

  /**
   * Represents an `href` attribute value applied to a host element,
   * when a host element is `<a>`. For other tags, the value is `null`.
   */
  href: string | null = null;

  /**
   * Represents the `target` attribute on a host element.
   * This is only used when the host element is an `<a>` tag.
   */
  @HostBinding('attr.target') @Input() target?: string;

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

  /** Whether a host element is an `<a>` tag. */
  private isAnchorElement: boolean;

  private subscription?: Subscription;

  /** @internal */
  onChanges = new Subject<RouterLink>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Attribute('tabindex')
    private readonly tabIndexAttribute: string | null | undefined,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef,
    private locationStrategy?: LocationStrategy
  ) {
    const tagName = el.nativeElement.tagName;
    this.isAnchorElement = tagName === 'A' || tagName === 'AREA';

    if (this.isAnchorElement) {
      this.subscription = router.events.subscribe((s: Event) => {
        if (s instanceof NavigationEnd) {
          this.updateHref();
        }
      });
    } else {
      this.setTabIndexIfNotOnNativeEl('0');
    }
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
   * Modifies the tab index if there was not a tabindex attribute on the element during
   * instantiation.
   */
  private setTabIndexIfNotOnNativeEl(newTabIndex: string | null) {
    if (
      this.tabIndexAttribute != null /* both `null` and `undefined` */ ||
      this.isAnchorElement
    ) {
      return;
    }
    this.applyAttributeValue('tabindex', newTabIndex);
  }

  /** @nodoc */
  ngOnChanges(changes: SimpleChanges) {
    if (this.isAnchorElement) {
      this.updateHref();
    }
    // This is subscribed to by `RouterLinkActive` so that it knows to update when there are changes
    // to the RouterLinks it's tracking.
    this.onChanges.next(this);
  }

  /**
   * Commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
   *   - **array**: commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
   *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
   *   - **null|undefined**: effectively disables the `routerLink`
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input()
  set routerLink(commands: any[] | string | null | undefined) {
    if (commands != null) {
      this.commands = Array.isArray(commands) ? commands : [commands];
      this.setTabIndexIfNotOnNativeEl('0');
    } else {
      this.commands = null;
      this.setTabIndexIfNotOnNativeEl(null);
    }
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
    if (this.urlTree === null) {
      return true;
    }

    if (this.isAnchorElement) {
      if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
        return true;
      }

      if (typeof this.target === 'string' && this.target != '_self') {
        return true;
      }
    }

    const extras = {
      skipLocationChange: this.skipLocationChange,
      replaceUrl: this.replaceUrl,
      state: this.state
    };
    this.router.navigateByUrl(this.urlTree, extras);

    // Return `false` for `<a>` elements to prevent default action
    // and cancel the native behavior, since the navigation is handled
    // by the Router.
    return !this.isAnchorElement;
  }

  /** @nodoc */
  ngOnDestroy(): any {
    this.subscription?.unsubscribe();
  }

  private updateHref(): void {
    this.href =
      this.urlTree !== null && this.locationStrategy
        ? this.locationStrategy?.prepareExternalUrl(
            this.router.serializeUrl(this.urlTree)
          )
        : null;

    const sanitizedValue =
      this.href === null
        ? null
        : // This class represents a directive that can be added to both `<a>` elements,
          // as well as other elements. As a result, we can't define security context at
          // compile time. So the security context is deferred to runtime.
          // The `ɵɵsanitizeUrlOrResourceUrl` selects the necessary sanitizer function
          // based on the tag and property names. The logic mimics the one from
          // `packages/compiler/src/schema/dom_security_schema.ts`, which is used at compile time.
          //
          // Note: we should investigate whether we can switch to using `@HostBinding('attr.href')`
          // instead of applying a value via a renderer, after a final merge of the
          // `RouterLinkWithHref` directive.
          ɵɵsanitizeUrlOrResourceUrl(
            this.href,
            this.el.nativeElement.tagName.toLowerCase(),
            'href'
          );
    this.applyAttributeValue('href', sanitizedValue);
  }

  private applyAttributeValue(attrName: string, attrValue: string | null) {
    const renderer = this.renderer;
    const nativeElement = this.el.nativeElement;
    if (attrValue !== null) {
      renderer.setAttribute(nativeElement, attrName, attrValue);
    } else {
      renderer.removeAttribute(nativeElement, attrName);
    }
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
