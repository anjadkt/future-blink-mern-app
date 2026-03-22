// import { useAuth } from "../context/AuthContext";

// export default function HistoryNode() {

//   const {user} = useAuth();
//   const chats = user.chats ;

//   if(!user)return null ;

//   return (
//     <div className="bg-gray-900/95 backdrop-blur-2xl border border-gray-800 rounded-2xl p-0 shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)] min-w-[350px] max-w-[400px] font-sans overflow-hidden transition-all hover:border-cyan-500/30">
      
//       <div className="bg-gray-800/50 px-5 py-3 border-b border-gray-700/50 flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
//           <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-black">
//             Stored Neural Logs
//           </span>
//         </div>
//         <span className="text-[9px] font-mono text-gray-500 bg-gray-950 px-2 py-0.5 rounded">
//           {chats.length} ENTRIES
//         </span>
//       </div>

//       <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-4 space-y-4 bg-gray-950/20">
//         {chats.length > 0 ? (
//           chats.map((item, index) => (
//             <div 
//               key={index} 
//               className="group border-l-2 border-fuchsia-500/30 hover:border-fuchsia-500 bg-gray-900/40 p-3 rounded-r-xl transition-all hover:bg-gray-800/40"
//             >
//               <div className="flex gap-2 mb-2">
//                 <span className="text-[10px] font-mono text-fuchsia-500 font-bold opacity-60">Q:</span>
//                 <p className="text-xs text-gray-200 font-medium leading-tight">
//                   {item.question}
//                 </p>
//               </div>

//               <div className="flex gap-2 bg-black/30 p-2 rounded-lg border border-gray-800/50 group-hover:border-cyan-500/20">
//                 <span className="text-[10px] font-mono text-cyan-400 font-bold opacity-60">A:</span>
//                 <p className="text-[11px] text-cyan-100/80 italic leading-relaxed">
//                   {item.response}
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="py-10 text-center">
//             <p className="text-xs text-gray-600 font-mono italic">No data packets found in buffer...</p>
//           </div>
//         )}
//       </div>

//       <div className="px-4 py-2 bg-gray-900/80 border-t border-gray-800 flex justify-between items-center">
//         <div className="text-[8px] text-gray-500 font-mono tracking-tighter">
//           SYSTEM_STATUS: STABLE
//         </div>
//         <button 
          
//           className="text-[9px] text-red-400/60 hover:text-red-400 uppercase font-bold transition-colors"
//         >
//           Clear Buffer
//         </button>
//       </div>

//     </div>
//   );
// }