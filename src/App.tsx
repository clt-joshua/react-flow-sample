import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";
import type { NodeChange, EdgeChange, Connection } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import { initialNodes, initialEdges } from "./data";
import { SlotNode, TextNode } from "./components/Node";
import { FLOW_SETTINGS } from "./constants";

/**
 * 선박 예약 챗봇 플로우 시각화 메인 애플리케이션 컴포넌트
 *
 * React Flow를 사용하여 대화형 챗봇 플로우를 시각적으로 구성하고 편집할 수 있는
 * 인터페이스를 제공합니다. 사용자는 노드를 추가/편집/삭제하고 연결할 수 있습니다.
 *
 * @returns JSX.Element
 */
export default function App() {
  // 노드와 엣지 상태 관리
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  /**
   * 지원되는 노드 타입들 정의
   * - slotFilling: 사용자 입력을 받는 슬롯 채우기 노드
   * - text: 단순 메시지 출력 노드
   * - confirmation: 확인/취소 선택 노드
   */
  const nodeTypes = useMemo(
    () => ({
      slotFilling: SlotNode,
      text: TextNode,
      confirmation: SlotNode, // 확인 노드도 SlotNode 구조 사용
    }),
    []
  );

  /**
   * 노드 변경사항을 처리합니다
   * 노드의 위치 이동, 선택, 삭제 등의 변경사항을 적용합니다
   */
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    console.log("노드 변경:", changes);
    setNodes(
      (nodesSnapshot) =>
        applyNodeChanges(changes, nodesSnapshot) as typeof nodesSnapshot
    );
  }, []);

  /**
   * 엣지 변경사항을 처리합니다
   * 엣지의 선택, 삭제 등의 변경사항을 적용합니다
   */
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    console.log("엣지 변경:", changes);
    setEdges(
      (edgesSnapshot) =>
        applyEdgeChanges(changes, edgesSnapshot) as typeof edgesSnapshot
    );
  }, []);

  /**
   * 새로운 연결을 생성합니다
   * 사용자가 노드 간 연결을 만들 때 호출됩니다
   */
  const onConnect = useCallback((params: Connection) => {
    console.log("새 연결 생성:", params);
    setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
  }, []);

  return (
    <div
      className="app-container"
      style={FLOW_SETTINGS.VIEWPORT}
      role="application"
      aria-label="선박 예약 챗봇 플로우 에디터"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          animated: FLOW_SETTINGS.EDGE_OPTIONS.animated,
          style: {
            strokeWidth: FLOW_SETTINGS.EDGE_OPTIONS.strokeWidth,
            stroke: FLOW_SETTINGS.EDGE_OPTIONS.strokeColor,
          },
        }}
      >
        {/* 배경 그리드 패턴 */}
        <Background gap={20} size={1} color="#e5e5e5" />

        {/* 줌/팬 컨트롤 */}
        <Controls showZoom={true} showFitView={true} showInteractive={true} />

        {/* 미니맵 */}
        <MiniMap
          position="bottom-right"
          zoomable
          pannable
          nodeColor={(node) => {
            switch (node.type) {
              case "slotFilling":
                return "#767BFB";
              case "confirmation":
                return "rgba(20, 175, 146, 1)";
              case "text":
                return "rgba(255, 156, 102, 1)";
              default:
                return "#cccccc";
            }
          }}
        />
      </ReactFlow>
    </div>
  );
}
