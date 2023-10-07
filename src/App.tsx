import './App.scss'
import { useState } from 'react'
import TreeNode from './components/TreeNode';
import { Tree, Node } from './models/Tree';
import { generateRandomId } from './utils/generateRandom';
import DraggableWrapper from './components/WithDraggable';
import { BiNavigation } from 'react-icons/bi';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function App() {

  const node = new Node(generateRandomId(), "Categories", 0);
  const tree = new Tree();
  tree.root = node;

  const [root, setRoot] = useState<Node | null>(tree.root);

  const renderTreeNodes = (subTree: Node[], parent: Node, remove: any) => {
    return subTree.map((node) => {
      return (
        <li
          key={node.id}
        >
          <TreeNode
            parent={parent}
            remove={remove}
            node={node}
            renderTreeNodes={renderTreeNodes}
          ></TreeNode>
        </li>
      );
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(100);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleZoom = (val: number) => {
    setZoom(val);
    setIsOpen(false);
  }

  return (
    <div
      className="flex-container items-center justify-center"
    >
      <header
        className='header'>
        <div className='header-brand'>
          <h4 className='header-brand-title'>Services </h4>
          <div className='header-brand-title-badge'

          >0</div>
        </div>
        <div className="header-actions">

          <button
            className="action-list-view-button"
          >
            List View
          </button>
          <button
            className="action-share-button"
          >
            <BiNavigation />
          </button>
          <div className="action-zoom-button">
            <button
              onClick={() => handleZoom(zoom - 10)}
              className="action-zoom-out-button"
            >
              <AiOutlineMinus />
            </button>
            <div
              style={{
                overflow: isOpen ? "visible" : "hidden",
              }}
              className="action-zoom-dropdown">
              <button className="zoom-button" onClick={toggleDropdown}>
                <span>{zoom}%</span>
              </button>
              <div
                style={{
                  height: isOpen ? "auto" : "0px",
                }}
                className="dropdown-content">
                <button className="dropdown-item" onClick={() => handleZoom(25)}>
                  25%
                </button>
                <button className="dropdown-item" onClick={() => handleZoom(50)}>
                  50%
                </button>
                <button className="dropdown-item" onClick={() => handleZoom(75)}>
                  75%
                </button>
                <button className="dropdown-item" onClick={() => handleZoom(100)}>
                  100%
                </button>
                <button className="dropdown-item" onClick={() => handleZoom(125)}>
                  125%
                </button>
                <button className="dropdown-item" onClick={() => handleZoom(150)}>
                  150%
                </button>
                <button className="dropdown-item" onClick={() => handleZoom(175)}>
                  175%
                </button>
                <button className="dropdown-item" onClick={() => handleZoom(200)}>
                  200%
                </button>
              </div>
            </div>

            <button
              onClick={() => handleZoom(zoom + 10)}
              className="action-zoom-in-button"
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </header>
      <hr />
      <DraggableWrapper >
        <div
          className="tree"
          style={{
            transform: `scale(${zoom / 100})`,
          }}
        >
          {root && (
            <TreeNode
              remove={(e: any) => {
                e.stopPropagation()
                tree.root = null;
                setRoot(null);
              }}
              parent={null}
              node={tree.root}
              renderTreeNodes={renderTreeNodes}
            />
          )}
        </div>
      </DraggableWrapper>
    </div>

  );
}

export default App
