import { useState } from "react";
import { Node } from "../models/Tree";
import { BiPlus, BiSolidEditAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { classNames } from "../utils/classnames";
import { generateRandomColor, generateRandomId } from "../utils/generateRandom";

const TreeNode = ({ node, parent, remove, renderTreeNodes }: {
    node: Node;
    parent: Node | null;
    remove: any;
    renderTreeNodes: any;
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [subTree, setSubTree] = useState(node.children);
    const [data, setData] = useState(node.data);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const onAddChild = () => {
        const newNode = new Node(generateRandomId(), "SubTree Category", node.level + 1);
        node.add(newNode);
        setSubTree([...node.children]);
    };

    const onRemoveNode = (id: string) => {
        node.remove(id);
        setSubTree([...node.children]);
    };

    const onkeydown = (e: any) => {
        if (e.key === "Enter") {
            node.data = e.target.value;
            toggleEditMode();
        }
    }

    return (
        <div className="flex flex-column items-center justify-center">
            <div
                className="node-container relative flex flex-column justify-center items-center relative"
            >
                <div
                    className={
                        classNames(
                            "node-box relative",
                            parent === null ? "root" : "",
                        )
                    }>
                    {
                        isEditing ? (
                            <input
                                type="text"
                                placeholder="Enter name"
                                className="node-input"
                                value={data}
                                onChange={(e) => {
                                    setData(e.target.value);
                                }}
                                onKeyDown={onkeydown}
                            />
                        ) : (
                            <div className="node-data flex items-center justify-center"
                                style={{
                                    backgroundColor: generateRandomColor(node.level),
                                    color: parent === null ? "black" : "white",
                                }}
                            >
                                <h4>
                                    {node.data}
                                </h4>
                            </div>
                        )
                    }
                    <div className="node-action flex items-center">
                        <button className="node-action-button flex justify-center items-center" onClick={onAddChild} title="plus">
                            <BiPlus />
                        </button>
                        {
                            parent !== null && (
                                <>
                                    <button className="node-action-button flex justify-center items-center" onClick={toggleEditMode} title="edit" >
                                        <BiSolidEditAlt />
                                    </button>
                                    <button className="node-action-button flex justify-center items-center remove" onClick={() => remove(node.id)} title="remove">
                                        <RxCross2 />
                                    </button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {subTree && <ul className="">{renderTreeNodes(subTree, node, onRemoveNode)}</ul>}
        </div>
    );
};

export default TreeNode;
