/**
 * Register editor block
 */
(function (blocks, editor, components, i18n, element) {
    var el = element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var InspectorControls = wp.blockEditor.InspectorControls;

    var TextControl = wp.components.TextControl;
    var SelectControl = wp.components.SelectControl;
    var ServerSideRender = wp.serverSideRender;
    var ToggleControl = wp.components.ToggleControl;
    var ColorPicker = wp.components.ColorPicker;
    var PanelBody = wp.components.PanelBody;

    registerBlockType('getbutterfly/font-awesome', {
        title: 'Font Awesome Icon',
        description: 'A single Font Awesome icon block.',
        icon: 'star-filled',
        category: 'getbutterfly',
        keywords: [
            i18n.__('fa'),
            i18n.__('font'),
            i18n.__('icon'),
            i18n.__('awesome'),
            i18n.__('pictogram')
        ],

        attributes: {
            faClass: {
                type: 'string',
                default: '',
            },
            faColor: {
                type: 'string',
                default: '#000000',
            },
            fixedWidth: {
                type: 'boolean',
                default: false,
            },
            newTab: {
                type: 'boolean',
                default: false,
            },
            faLink: {
                type: 'string',
                default: '',
            },
            faAlign: {
                type: 'string',
                default: 'left',
            },
        },

        edit: function (props) {
            var attributes = props.attributes;

            var faClass = attributes.faClass;
            var faColor = attributes.faColor;
            var faLink = attributes.faLink;
            var fixedWidth = attributes.fixedWidth;
            var newTab = attributes.newTab;
            var faAlign = attributes.faAlign;

            // Get block props
            var blockProps = useBlockProps();

            return [
                el(InspectorControls, { key: 'inspector' },
                    el(
                        PanelBody, {
                        title: i18n.__('Icon Settings'),
                        className: 'getbutterfly_block',
                        initialOpen: true,
                    },

                        el(TextControl, {
                            type: 'string',
                            label: i18n.__('Icon class'),
                            placeholder: i18n.__('fas fa-sync-alt'),
                            help: i18n.__('Icon Font Awesome class, including fixed width or animations. Custom classes are also allowed.'),
                            value: faClass,
                            onChange: function (new_faClass) {
                                props.setAttributes({ faClass: new_faClass });
                            },
                        }),
                        el(TextControl, {
                            type: 'url',
                            label: i18n.__('Icon URL'),
                            placeholder: 'https://',
                            help: i18n.__('Link to an internal page or an external resource.'),
                            value: faLink,
                            onChange: function (new_faLink) {
                                props.setAttributes({ faLink: new_faLink });
                            },
                        }),
                        el(ToggleControl, {
                            type: 'boolean',
                            label: i18n.__('Fixed width'),
                            help: i18n.__('Whether to use a fixed-width icon.'),
                            checked: !!fixedWidth,
                            onChange: function (new_fixedWidth) {
                                props.setAttributes({ fixedWidth: new_fixedWidth });
                            },
                        }),
                        el(ToggleControl, {
                            type: 'boolean',
                            label: i18n.__('Open in new tab'),
                            help: i18n.__('Whether to open the link in a new tab.'),
                            checked: !!newTab,
                            onChange: function (new_newTab) {
                                props.setAttributes({ newTab: new_newTab });
                            },
                        }),
                        el(SelectControl, {
                            type: 'string',
                            label: i18n.__('Icon alignment'),
                            value: faAlign,
                            options: [
                                { label: i18n.__('Left'), value: 'left' },
                                { label: i18n.__('Center'), value: 'center' },
                                { label: i18n.__('Right'), value: 'right' },
                            ],
                            onChange: function (new_faAlign) {
                                props.setAttributes({ faAlign: new_faAlign });
                            },
                        }),
                        el(ColorPicker, {
                            type: 'string',
                            label: i18n.__('Icon Colour'),
                            color: faColor,
                            enableAlpha: true,
                            onChange: function (new_faColor) {
                                props.setAttributes({ faColor: new_faColor });
                            },
                        }),
                    ),
                ),
                el('div', blockProps,
                    el(ServerSideRender, {
                        block: 'getbutterfly/font-awesome',
                        attributes: props.attributes
                    })
                )
            ];
        },

        save: function () {
            return null;
        },
    });
})(
    window.wp.blocks,
    window.wp.editor,
    window.wp.components,
    window.wp.i18n,
    window.wp.element,
);
