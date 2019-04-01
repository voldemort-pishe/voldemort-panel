import { Directive, Input, TemplateRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ElementRef } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { LoadingSpinnerComponent } from '../components/loading-spinner.component';

@Directive({ selector: '[appLoading]' })
export class LoadingDirective {

    // Resources:
    // https://angular.io/guide/structural-directives
    // https://netbasal.com/dynamically-creating-components-with-angular-a7346f4a982d
    // https://netbasal.com/create-advanced-components-in-angular-e0655df5dde6
    // https://stackoverflow.com/questions/41789702/how-to-use-angular-structural-directive-with-multiple-inputs

    private component: ComponentRef<LoadingSpinnerComponent>;

    constructor(
        private templateRef: TemplateRef<any>,
        private resolver: ComponentFactoryResolver,
        private viewContainer: ViewContainerRef,
    ) { }

    @Input() set appLoading(condition: boolean) {
        this.viewContainer.clear();
        if (condition) {
            let componentFactory = this.resolver.resolveComponentFactory(LoadingSpinnerComponent);
            this.component = this.viewContainer.createComponent(componentFactory);
            this.refreshComponent();
        }
        else
            this.viewContainer.createEmbeddedView(this.templateRef);
    }

    private _color: ThemePalette;
    @Input('appLoadingColor')
    public get color(): ThemePalette {
        return this._color;
    }
    public set color(v: ThemePalette) {
        this._color = v;
        this.refreshComponent();
    }

    private _diameter: number;
    @Input('appLoadingDiameter')
    public get diameter(): number {
        return this._diameter;
    }
    public set diameter(v: number) {
        this._diameter = v;
        this.refreshComponent();
    }

    private _margin: number;
    @Input('appLoadingMargin')
    public get margin(): number {
        return this._margin;
    }
    public set margin(v: number) {
        this._margin = v;
        this.refreshComponent();
    }

    private _button: boolean = false;
    @Input('appLoadingButton')
    public get button(): boolean {
        return this._button;
    }
    public set button(v: boolean) {
        this._button = v === false ? false : true;
        this.refreshComponent();
    }

    private refreshComponent(): void {
        if (!this.component) return;

        if (this.button) {
            this._diameter = 24;
            this._margin = 6;
        }

        this.component.instance.color = this.color || undefined;
        this.component.instance.diameter = this.diameter || 100;
        this.component.instance.margin = this.margin || 0;
    }
}
