import ReactFlow, { Background } from 'reactflow'
import "reactflow/dist/style.css"
import InputNode from '../components/InputNode';
import OutputNode from '../components/OutputNode';
import { useState } from 'react';
import api from '../services/axios';

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
};


export default function Home (){
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [running,setRunning] = useState(false);
    const [saving,setSaving] = useState(false);


    const handleRun = async (value?: string) => {
        const text = value || input;

        if(!text?.trim() || text.length > 500)return;

        try{
            setRunning(true);
            const {data} = await api.post('/ai/ask',{question : text});
            setOutput(data.response);
        }catch(error){
            console.log(error);
        }finally{
            setRunning(false);
        }
    };

    const handleSave = async () => {
        const chat = {
            question : input,
            response : output
        };

        if(!input.trim() || !output?.trim())return ;

        setSaving(true);
        try{
            await api.post('/ai/save',chat);
            setInput("");
            setOutput("");
        }catch(error){
            console.log(error)
        }finally{
            setSaving(false);
        }
    };


    const nodes = [
        {
            id: "1",
            type: "inputNode",
            position: { x: 350, y: 200 },
            data: {
                onChange: setInput,
                onRun: handleRun,
                onSave: handleSave,
                running,
                input
            },
        },
        {
            id: "2",
            type: "outputNode",
            position: { x: 700, y: 200 },
            data: {
                value: output,
                onRun: handleRun,
                onSave: handleSave,
                saving,
                running
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