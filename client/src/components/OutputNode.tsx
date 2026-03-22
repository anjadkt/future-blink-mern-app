import { Handle, Position } from "reactflow";

export default function OutputNode({ data }: any) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-xl p-4 shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] max-w-[300px] font-sans">
      <div className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold mb-3 border-b border-gray-800 pb-2">
        System Output
      </div>

      <div className="bg-gray-950/80 rounded-lg p-3 border border-gray-800/50 max-h-[200px] overflow-auto custom-scrollbar">
        <div className="text-xs font-mono text-emerald-400 leading-relaxed">
          {data.value ? (
            <p>{`> ${data.value}`}</p>
          ) : (
            <div className="animate-pulse flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Waiting for {data.running ? "response" : "input"}...
            </div>
          )}
        </div>
      </div>

      {data.value && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => data.onClear?.()}
            className="flex-1 py-2 px-3 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400/80 hover:text-red-400 text-[10px] font-bold rounded-lg transition-all cursor-pointer uppercase tracking-tighter"
          >
            Clear
          </button>

          <button
            onClick={() => data.onSave?.()}
            className="flex-[2] py-2 px-4 border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 text-[10px] font-bold rounded-lg transition-all cursor-pointer uppercase tracking-widest"
          >
            {data.saving ? (
              <div className="animate-pulse">Saving...</div>
            ) : (
              "Save to Chats"
            )}
          </button>
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-fuchsia-400 border-2 border-gray-950 shadow-[0_0_8px_rgba(217,70,239,0.8)]"
      />
    </div>
  );
}