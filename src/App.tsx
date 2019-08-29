import * as React from 'react';
import {
  DefaultButton,
  DetailsHeader,
  DetailsList,
  IColumn,
  IDetailsHeaderProps,
  IDetailsList,
  IGroup,
  IRenderFunction,
  IToggleStyles,
  mergeStyles,
  Toggle
} from 'office-ui-fabric-react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

const margin = '0 20px 20px 0';
const controlWrapperClass = mergeStyles({
  display: 'flex',
  flexWrap: 'wrap'
});
const toggleStyles: Partial<IToggleStyles> = {
  root: { margin: margin },
  label: { marginLeft: 10 }
};

export interface IDetailsListGroupedExampleItem {
  count: number;
  name: string;
  metric: number;
  testType: number[];
  unit: 'ms'
}

export interface IDetailsListGroupedExampleState {
  items: IDetailsListGroupedExampleItem[];
  groups: IGroup[];
  showItemIndexInView: boolean;
  isCompactMode: boolean;
}
const _blueGroupIndex = 2;

export class App extends React.Component<{}, IDetailsListGroupedExampleState> {
  private _root = React.createRef<IDetailsList>();
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this.state = {
      showItemIndexInView: false,
      isCompactMode: false,
      items: [],
      groups: []
    };

    this._columns = [
      { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'category', name: 'Category', fieldName: 'category', minWidth: 100, maxWidth: 200 }
    ];

    initializeIcons();
  }

  public componentDidMount() {
    const responseData = [
      {
        name: 'Timing',
        category:0,
        metrics:[
          {
            testType:[0,1],
            metric: 0,
            count: 0,
            name: 'Response1',
            unit: 'ms',
          },
          {
            testType:[0,1],
            metric: 0,
            count: 0,
            name: 'Response2',
            unit: 'ms',
          },
          {
            testType:[0,1],
            metric: 0,
            count: 0,
            name: 'Response3',
            unit: 'ms',
          }
        ]
      },
      {
        name: 'Category',
        category:1,
        metrics:[
          {
            testType:[1,2,3],
            metric: 1,
            count: 0,
            name: 'Metric',
            unit: 'ms',
          }
        ]
      }
    ];
    const items:any = [];
    const groups:any = [];
    responseData.forEach((item, index) => {
      groups.push({
        key: item.name,
        name: item.name,
        startIndex: groups[index-1] ? groups[index-1].startIndex + responseData[index-1].metrics.length : 0,
        count: item.metrics.length
      });
      
      items.push(...item.metrics);
    });

    this.setState({
      items,
      groups
    });
  }

  public componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._root.current!.getStartItemIndexInView();
      alert('first item index that was in view: ' + itemIndexInView);
    }
  }

  public render() {
    const { items, groups, isCompactMode } = this.state;

    return (
      <div>
        <div className={controlWrapperClass}>
          <DefaultButton onClick={this._addItem} text="Add an item" styles={{ root: { margin: margin } }} />
          <Toggle label="Compact mode" inlineLabel checked={isCompactMode} onChange={this._onChangeCompactMode} styles={toggleStyles} />
          <Toggle
            label="Show index of first item in view when unmounting"
            inlineLabel
            checked={this.state.showItemIndexInView}
            onChange={this._onShowItemIndexInViewChanged}
            styles={toggleStyles}
          />
        </div>
        <DetailsList
          componentRef={this._root}
          items={items}
          groups={groups}
          columns={this._columns}
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          ariaLabelForSelectionColumn="Toggle selection"
          checkButtonAriaLabel="Row checkbox"
          onRenderDetailsHeader={this._onRenderDetailsHeader}
          groupProps={{
            showEmptyGroups: true
          }}
          onRenderItemColumn={this._onRenderColumn}
          compact={isCompactMode}
        />
      </div>
    );
  }

  private _addItem = (): void => {
    const items = this.state.items;
    const groups = [...this.state.groups];
    groups[_blueGroupIndex].count++;

    this.setState(
      {
        items: items.concat([
          {
            testType:[1,2,3],
            metric: 1,
            count: 0,
            name: 'Metric',
            unit: 'ms'
          }
        ]),
        groups
      },
      () => {
        if (this._root.current) {
          this._root.current.focusIndex(items.length, true);
        }
      }
    );
  };

  private _onRenderDetailsHeader(props: any, _defaultRender?: any) {
    return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton={'Expand collapse groups'} />;
  }

  private _onRenderColumn(item: any, index: any, column: any) {
    const value = item && column && column.fieldName ? item[column.fieldName as keyof IDetailsListGroupedExampleItem] || '' : '';

    return <div data-is-focusable={true}>{value}</div>;
  }

  private _onShowItemIndexInViewChanged = (event: any, checked: any): any => {
    this.setState({ showItemIndexInView: checked });
  };

  private _onChangeCompactMode = (ev: any, checked: any): void => {
    this.setState({ isCompactMode: checked });
  };
}