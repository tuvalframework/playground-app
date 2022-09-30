import {
    CornerRadiusTypes,
    cTopLeading,
    ForEach,
    HStack,
    Icon,
    IconLibrary,
    IconType,
    ScrollView,
    Text,
    UIController,
    UIScene,
    VStack,
    cVertical,
    PositionTypes,
    Color,
    Cache,
    UIButton,
    State,
    Spacer,
    UIImage,
    cTop,
    ZStack
} from '@tuval/forms';
import { TForm, cLeading, UIContextMenu } from '@tuval/forms';
import { is } from '@tuval/core';
import { CodeEditorView } from '@realmocean/codeeditor';
import { model } from '../Models/menuModel';
import { menuItem } from '../Views/mainMenu';

const manifest = require('../../manifest');


export class AppController extends UIController {

    private form: TForm;

    @State()
    private SideBarExpanded: boolean;

    @State()
    private Code: string;

    protected InitController() {


    }

    public OnBindModel(form: TForm) {
        this.form = form;
    }
    public LoadView() {
        console.log('View Rendered');

        var expression = `

        const Color = tuval$forms.Color;
        const VStack = tuval$forms.VStack;
        const HStack = tuval$forms.HStack;
        const ForEach = tuval$forms.ForEach;

        const cTop = tuval$forms.cTop;
        const cTopLeading = tuval$forms.cTopLeading;
        const cLeading = tuval$forms.cLeading;
        const cTopTrailing = tuval$forms.cTopTrailing;
        const cTrailing = tuval$forms.cTrailing;

        const Text = tuval$forms.Text;
        const Icon = tuval$forms.Icon;
        const IconLibrary = tuval$forms.IconLibrary;

        const UIContextMenu = tuval$forms.UIContextMenu;
        const UIImage = tuval$forms.UIImage;
        const UIButton = tuval$forms.UIButton;
        const TextField = tuval$forms.TextField;
        const Spacer = tuval$forms.Spacer;
        const DesktopPreview = tuval$forms.DesktopPreview;
        const bindState = tuval$forms.bindState;

        const UITable = tuval$forms.UITable;
        const TableColumn = tuval$forms.TableColumn;
        const TBody = tuval$forms.TBody;
        const UIAppearance = tuval$forms.UIAppearance;
        const Gauge = tuval$forms.Gauge;

        const ScrollView = tuval$forms.ScrollView;

            ${is.nullOrEmpty(this.Code) ? null : this.Code}

        `;
        let result = null;
        try {
            result = eval('(function() { try {' + expression + '}catch(ex){console.log(ex)}}())');
        }
        catch (ex) { console.log(ex) }

        try {
            return UIScene(
                VStack({ alignment: cTopLeading })(
                    HStack(
                        HStack(
                            UIImage(manifest.application.icon).width(20).height(20)
                        ).minWidth('50px').width(50),
                        HStack(
                            Text('Tuval UI Playground').fontWeight('500')
                        ).onMouseDown((e) => this.form.StartFormDrag(e)),
                    ).minHeight('40px').height(40).backgroundColor('#FDFDFD').borderBottom('1px solid #F2F2F2'),
                    HStack(Text(''))
                        .height('0.1rem')
                        .background("linear-gradient(90deg, rgb(100, 91, 83) 0%, rgb(235, 82, 82) 18.23%, rgb(247, 143, 47) 34.37%, rgb(244, 193, 81) 48.96%, rgb(82, 187, 118) 66.15%, rgb(38, 165, 215) 82.29%, rgb(224, 105, 183) 100%)"),
                    HStack({ alignment: cTopLeading })(
                        VStack({ alignment: cTopLeading })(
                            CodeEditorView().height('100%').padding(10).onTextChange((value) => setTimeout(() => this.Code = value, 100))
                        ),
                        VStack(
                            result == null ? HStack() : result
                        ).background('#eff3f8')

                    )
                ).backgroundColor('#1e1e1e')
            )
        } catch (ex) {
            console.log(ex);
        }
    }
}