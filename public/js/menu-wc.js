'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">firebase-usermanagement documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminPopupModule.html" data-type="entity-link">AdminPopupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminPopupModule-01b2a9d86d01dad28ebe9e603d02214b"' : 'data-target="#xs-components-links-module-AdminPopupModule-01b2a9d86d01dad28ebe9e603d02214b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPopupModule-01b2a9d86d01dad28ebe9e603d02214b"' :
                                            'id="xs-components-links-module-AdminPopupModule-01b2a9d86d01dad28ebe9e603d02214b"' }>
                                            <li class="link">
                                                <a href="components/AdminPopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminPopupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupModule.html" data-type="entity-link">GroupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupModule-01c97bd3e3354062090eccc82aa4e485"' : 'data-target="#xs-components-links-module-GroupModule-01c97bd3e3354062090eccc82aa4e485"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupModule-01c97bd3e3354062090eccc82aa4e485"' :
                                            'id="xs-components-links-module-GroupModule-01c97bd3e3354062090eccc82aa4e485"' }>
                                            <li class="link">
                                                <a href="components/GroupCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupUsersSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupUsersSettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginProvidersModule.html" data-type="entity-link">LoginProvidersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginProvidersModule-d9c32bbf6bb2fbdc248a33c50e74708e"' : 'data-target="#xs-components-links-module-LoginProvidersModule-d9c32bbf6bb2fbdc248a33c50e74708e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginProvidersModule-d9c32bbf6bb2fbdc248a33c50e74708e"' :
                                            'id="xs-components-links-module-LoginProvidersModule-d9c32bbf6bb2fbdc248a33c50e74708e"' }>
                                            <li class="link">
                                                <a href="components/LoginEmailPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginEmailPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginGoogleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginGoogleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgUserManagementModule.html" data-type="entity-link">NgUserManagementModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NgUserManagementModule-33e8b7ad473fda408ef5b94537ad977e"' : 'data-target="#xs-injectables-links-module-NgUserManagementModule-33e8b7ad473fda408ef5b94537ad977e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NgUserManagementModule-33e8b7ad473fda408ef5b94537ad977e"' :
                                        'id="xs-injectables-links-module-NgUserManagementModule-33e8b7ad473fda408ef5b94537ad977e"' }>
                                        <li class="link">
                                            <a href="injectables/AdminPopupService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AdminPopupService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterModule.html" data-type="entity-link">RegisterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegisterModule-df39ebde5a8cf428db5c807e73b9b418"' : 'data-target="#xs-components-links-module-RegisterModule-df39ebde5a8cf428db5c807e73b9b418"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterModule-df39ebde5a8cf428db5c807e73b9b418"' :
                                            'id="xs-components-links-module-RegisterModule-df39ebde5a8cf428db5c807e73b9b418"' }>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpinnerModule.html" data-type="entity-link">SpinnerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SpinnerModule-6d063a29f14faba01998cb32a592008f"' : 'data-target="#xs-components-links-module-SpinnerModule-6d063a29f14faba01998cb32a592008f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpinnerModule-6d063a29f14faba01998cb32a592008f"' :
                                            'id="xs-components-links-module-SpinnerModule-6d063a29f14faba01998cb32a592008f"' }>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserAdminSettingsModule.html" data-type="entity-link">UserAdminSettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserAdminSettingsModule-3084b185679e6ba541ae294ac0d45943"' : 'data-target="#xs-components-links-module-UserAdminSettingsModule-3084b185679e6ba541ae294ac0d45943"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserAdminSettingsModule-3084b185679e6ba541ae294ac0d45943"' :
                                            'id="xs-components-links-module-UserAdminSettingsModule-3084b185679e6ba541ae294ac0d45943"' }>
                                            <li class="link">
                                                <a href="components/AdminSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserSettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ValidationMessageModule.html" data-type="entity-link">ValidationMessageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ValidationMessageModule-1cd1eaef73dc803585cd8486c4478e7d"' : 'data-target="#xs-components-links-module-ValidationMessageModule-1cd1eaef73dc803585cd8486c4478e7d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ValidationMessageModule-1cd1eaef73dc803585cd8486c4478e7d"' :
                                            'id="xs-components-links-module-ValidationMessageModule-1cd1eaef73dc803585cd8486c4478e7d"' }>
                                            <li class="link">
                                                <a href="components/ValidationMessageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ValidationMessageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link">UserModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminAuthService.html" data-type="entity-link">AdminAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminPopupService.html" data-type="entity-link">AdminPopupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupService.html" data-type="entity-link">GroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminAuthGuardService.html" data-type="entity-link">AdminAuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserAuthGuardService.html" data-type="entity-link">UserAuthGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ngUserManagementConfig.html" data-type="entity-link">ngUserManagementConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SnackBarInterface.html" data-type="entity-link">SnackBarInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});