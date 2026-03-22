import ReactFlow, { Background } from 'reactflow'
import "reactflow/dist/style.css"
import InputNode from '../components/InputNode';
import OutputNode from '../components/OutputNode';
import { useState } from 'react';

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
};


export default function Home (){
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");


    const handleRun = async (value?: string) => {
        const text = value || input;

        const result = text.toUpperCase();

        setOutput(result);
    };

    const handleSave = () => {
        const chat = {
            input,
            output
        };


    };


    const nodes = [
        {
            id: "1",
            type: "inputNode",
            position: { x: 100, y: 200 },
            data: {
                onChange: setInput,
                onRun: handleRun,
                onSave: handleSave,
            },
        },
        {
            id: "2",
            type: "outputNode",
            position: { x: 400, y: 200 },
            data: {
                value: output,
                onRun: handleRun,
                onSave: handleSave,
            },
        },
    ];

    const edges = [
        { id: "e1-2", source: "1", target: "2" },
    ];

   return (
        <div className="w-full h-[600px] bg-gray-950 border border-gray-800 relative overflow-hidden shadow-[0_0_50px_-15px_rgba(217,70,239,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-fuchsia-500/5 via-transparent to-transparent pointer-events-none" />
            
            <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            nodeTypes={nodeTypes}
            >
            <Background 
                gap={20} 
                size={1} 
                color="#374151"
            />
            
            </ReactFlow>
        </div>
    );

}