import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Cell, Graph } from '@antv/x6';
import '@antv/x6-angular-shape';
import * as _ from 'lodash';
import { BaseService } from 'common';
import { StateService } from 'projects/cms/src/shared/services/state.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-detail-workflow',
  templateUrl: './detail-workflow.component.html',
  styleUrls: ['./detail-workflow.component.less'],
})
export class DetailWorkflowComponent implements OnInit, AfterViewInit {
  /**VIEW CHILD */
  @ViewChild('container') container: ElementRef;
  /** PUBLIC METHOD */
  public mainFormState: FormGroup;
  public mainFormAction: FormGroup;
  public graph: Graph;
  public dataWorkflow: any = {};
  public graphBasicConfig = {
    // interacting: {
    //   nodeMovable: false,
    // },
    panning: true, // Canvas drag
    selecting: true,
    autoResize: true,
    background: { color: '#f7f8fa' },
    history: true,
    connecting: {
      router: 'orth',
      snap: true, // In the process of connecting, when the distance from the node or connection pile is 50px, automatic adsorption will be triggered
      allowBlank: false, // Whether to allow points connected to empty spaces of the canvas
      allowLoop: false, // Whether to allow the creation of cyclic connections, that is, the starting node and ending node of the edge are the same node
      allowNode: false, // Whether to allow edges to link to nodes (link stubs on non-nodes)
      allowEdge: false, // whether to allow an edge to link to another edge
      connector: 'rounded',
      connectionPoint: 'boundary',
    },
  };
  public isVisibleState = false;
  public isVisibleAction = false;
  public currentNode = null;
  public currentEventGraph = null;
  public selectedNode = null;
  public selectedAction = null;
  public currentEdge = null;
  public lstState = [];
  public currentCells: Cell[] = [];

  public dataGraph = {
    node: [],
    edge: [],
  };

  /**CONSTRUCTOR */
  constructor(
    private baseService: BaseService,
    private stateService: StateService,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((data: any) => {
      if (data && data.params.id) {
        this.getDetailWorkflow(data.params.id);
      }
    });
  }

  /**LIFE CYCLE */
  public ngOnInit(): void {
    this.createFormState();
    this.getAllState();
  }
  public ngAfterViewInit(): void {
    this.initGraph();
    this.styleDefaultGraph();
    this.renderGraph(this.dataGraph);
  }

  /** PUBLIC METHOD */

  public getAllWorkflow() {
    this.renderGraph(this.dataGraph);
  }

  public getDetailWorkflow(id) {}

  public getAllState() {
    this.baseService.showLoading(true);
    this.stateService.getLstStates().subscribe((res) => {
      if (res && res.data) {
        this.baseService.showLoading(false);
        this.lstState = res.data.data;
      } else {
        this.baseService.showLoading(false);
      }
    });
  }

  public openModalAddState() {
    this.clearValue();
    this.mainFormState.controls.firstState.enable();
    this.isVisibleState = true;
  }

  public handleOkState() {
    if (this.mainFormState.valid) {
      this.isVisibleState = false;
      this.addState(
        this.mainFormState.controls.firstState.value,
        this.mainFormState.controls.lastState.value
      );
    } else {
      Object.values(this.mainFormState.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  public handleCancel() {
    this.isVisibleState = false;
  }

  public handleOkAction() {
    this.isVisibleAction = false;
  }

  public openModalAddAction() {
    this.isVisibleAction = true;
  }

  public handleCancelAction() {
    this.isVisibleAction = false;
  }

  /** PRIVATE METHOD */
  private initGraph() {
    const height = document.getElementById('graphBox').offsetHeight;
    const graphConfig = {
      ...this.graphBasicConfig,
      height: height,
      container: this.container.nativeElement,
    };
    this.graph = new Graph(graphConfig);
    this.graph.on('node:add', ({ e, node }) => {
      this.currentNode = node;
      this.clearValue();
      this.mainFormState.controls.firstState.setValue(node.id.toString());
      this.mainFormState.controls.firstState.disable();
      this.isVisibleState = true;
    });

    this.graph.on('node:delete', ({ e, node }) => {
      this.deleteState(node);
    });

    this.graph.on('edge:mousedown', ({ cell }) => {
      if (cell) {
        this.currentEdge = cell;
        this.openModalAddAction();
      }
    });
  }

  private styleDefaultGraph(): void {
    Graph.registerNode(
      'activity',
      {
        inherit: 'rect',
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'image',
            selector: 'img',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
          {
            tagName: 'g',
            attrs: {
              class: 'btn add',
            },
            children: [
              {
                tagName: 'circle',
                attrs: {
                  class: 'add',
                },
              },
              {
                tagName: 'text',
                attrs: {
                  class: 'add',
                },
              },
            ],
          },
          {
            tagName: 'g',
            attrs: {
              class: 'btn del',
            },
            children: [
              {
                tagName: 'circle',
                attrs: {
                  class: 'del',
                },
              },
              {
                tagName: 'text',
                attrs: {
                  class: 'del',
                },
              },
            ],
          },
        ],
        attrs: {
          body: {
            rx: 10,
            ry: 10,
            refWidth: '100%',
            refHeight: '100%',
            stroke: '#5F95FF',
            fill: '#EFF4FF',
            strokeWidth: 1,
            pointerEvents: 'visiblePainted',
          },
          img: {
            x: 6,
            y: 6,
            width: 16,
            height: 16,
            'xlink:href':
              'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*pwLpRr7QPGwAAAAAAAAAAAAAARQnAQ',
          },
          label: {
            fontSize: 12,
            fill: '#262626',
          },
          '.btn.add': {
            refDx: -10,
            refY: 10,
            event: 'node:add',
          },
          '.btn.del': {
            refDx: -28,
            refY: 10,
            event: 'node:delete',
          },
          '.btn > circle': {
            r: 7,
            stroke: '#fe854f',
            'stroke-width': 2,
            fill: 'white',
            cursor: 'pointer',
          },
          '.btn.add > text': {
            fontSize: 16,
            fontWeight: 500,
            fontFamily: 'Times New Roman',
            fill: '#EE1A30',
            'text-anchor': 'middle',
            'pointer-events': 'none',
            y: -30,
            x: -50,
            text: '+',
          },
          '.btn.del > text': {
            fontSize: 22,
            fontWeight: 500,
            fontFamily: 'Times New Roman',
            fill: '#EE1A30',
            'text-anchor': 'middle',
            'pointer-events': 'none',
            y: -32,
            x: -50,
            text: '-',
          },
        },
      },
      true
    );
    Graph.registerEdge(
      'bpmn-edge',
      {
        inherit: 'edge',

        label: {
          attrs: {
            label: {
              fill: '#A2B1C3',
              fontSize: 12,
            },
          },
        },
        attrs: {
          line: {
            stroke: '#A2B1C3',
            strokeWidth: 2,
          },
        },
      },
      true
    );
  }

  private renderGraph(data: any) {
    const cells: Cell[] = [];
    let position = {
      x: 100,
      y: 50,
    };

    data.edge.forEach((item: any, i) => {
      const edge = this.graph.createEdge(item);
      cells.push(edge);
    });

    data.node.forEach((item: any, i) => {
      if (i % 2 !== 0) {
        position.x += 100;
        position.y -= 100;
      } else {
        position.x += 70;
        position.y += 100;
      }
      item.position = position;
      cells.push(this.graph.createNode(item));
    });

    this.currentCells = cells;
    this.graph.resetCells(this.currentCells);
    this.graph.zoomToFit({ maxScale: 1 });
    this.graph.positionContent('center');
  }

  private addState(source, target) {
    let sourceObj = null;
    let targetObj = null;
    sourceObj = _.filter(this.lstState, (x) => x.id === parseInt(source));
    targetObj = _.filter(this.lstState, (x) => x.id === parseInt(target));

    const resultNodeSource = _.filter(
      this.dataGraph.node,
      (x) => x.id === parseInt(source)
    );
    const resultNodeTarget = _.filter(
      this.dataGraph.node,
      (x) => x.id === parseInt(target)
    );

    if (resultNodeSource && resultNodeSource.length === 0) {
      const node = {
        id: sourceObj[0].id,
        shape: 'activity',
        width: 100,
        height: 60,
        label: sourceObj[0].name,
      };
      this.dataGraph.node.push(node);
    }

    if (resultNodeTarget && resultNodeTarget.length === 0) {
      const node = {
        id: targetObj[0].id,
        shape: 'activity',
        width: 100,
        height: 60,
        label: targetObj[0].name,
      };
      this.dataGraph.node.push(node);
    }

    if (sourceObj.length > 0) {
      const resultEdge = _.filter(
        this.dataGraph.edge,
        (x) => x.source === sourceObj[0].id && x.target === targetObj[0].id
      );
      if (resultEdge.length === 0) {
        const edge = {
          id: this.randomString(9),
          shape: 'bpmn-edge',
          source: sourceObj[0].id,
          target: targetObj[0].id,
          label: 'Action',
        };
        this.dataGraph.edge.push(edge);
      }
    }

    this.renderGraph(this.dataGraph);
  }

  private deleteState(node) {
    const resultNode = _.filter(this.dataGraph.node, (x) => x.id === node.id);
    this.modalService.confirm({
      nzTitle: `<i>Bạn có chắc muốn xóa State <b>${resultNode[0].label}</b> này không?</i>`,
      nzOnOk: () => {
        _.remove(this.dataGraph.node, (x) => {
          return x.id === node.id;
        });
        _.remove(this.dataGraph.edge, (x) => {
          return x.source === node.id || x.target === node.id;
        });
        this.renderGraph(this.dataGraph);
      },
      nzClosable: false,
      nzCancelText: 'Tôi không muốn',
      nzOkText: 'Đồng ý',
    });
  }

  private createFormState() {
    this.mainFormState = this.fb.group({
      firstState: new FormControl(null, Validators.required),
      lastState: new FormControl(null, Validators.required),
    });
  }

  private clearValue() {
    this.mainFormState.reset();
  }

  private randomString(len) {
    let charSet =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }
}
