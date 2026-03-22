import { Handle, Position } from "reactflow";
import { useState } from "react";

export default function InputNode({ data }: any) {
  const [value, setValue] = useState("");

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-xl p-4 shadow-[0_0_20px_-5px_rgba(217,70,239,0.3)] max-w-[220px] font-sans">
      <div className="text-[10px] uppercase tracking-widest text-fuchsia-400 font-bold mb-3 border-b border-gray-800 pb-2">
        Ask Me 
      </div>
      
      <div className="space-y-3">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            data.onChange?.(e.target.value);
          }}
          className="w-full bg-gray-950/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-500 transition-all placeholder-gray-700"
          placeholder="Type prompt..."
        />

        <button 
          onClick={() => data.onRun?.(value)}
          className="w-full py-2 px-4 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg transition-all transform active:scale-95"
        >
          EXECUTE FLOW
        </button>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 !bg-cyan-400 border-2 border-gray-950 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
      />
    </div>
  );
}