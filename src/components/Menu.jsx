import { useAppContext } from './AppContext';

export default function Menu() {
    const {game, setGame, theme, setTheme} = useAppContext();
    const canClick = game.type === '' ? true : false 

    return (
        <div className="">
            <div className="mb-5 max-w-100 p-4 bg-[#FEF6E7] text-gray-600 shadow-field rounded-xl text-center">
                    { game.type === '' && <div className="font-bold text-2xl">Cat Memory Games</div>}
                    { game.type === 1 && <div >In this mode, all cards are placed face down. Your goal is to find <strong>matching pairs</strong>. Each turn, you flip two cards: if they match, they stay revealed; if not, they turn face down again.
                    Try to uncover all pairs in as few moves as possible.</div>}
                    {game.type === 2 && <div>This is not a pairs game — your goal is to select every card exactly <strong>once</strong>. Avoid choosing the same card twice and try to complete the game in as few moves as possible.</div>}
                </div>
            <div className="max-w-fit m-auto flex flex-col gap-2 p-4 rounded-xl shadow-field bg-white">
                <div className="flex m-auto gap-2 p-2 ">
                    <button 
                        type="button" 
                        onClick={()=> setGame(prev=>({...prev, type: 1}))} 
                        className={ (game.type === 1 ? 'bg-[#FDF3C6] ' : '') + 'hover:bg-amber-200 hover:font-medium'}>
                            Match the Cats
                    </button> 
                    <button 
                        type="button" 
                        onClick={()=> setGame(prev=>({...prev, type: 2}))} 
                        className={ (game.type === 2 ? 'bg-[#FDF3C6] ' : '') + 'hover:bg-amber-200 hover:font-medium'}>
                            Pick Every Cat
                    </button>
                </div>
                <div>
                    {/* <select value={theme} onChange={(e)=>setTheme(e.target.value)}>
                        <option value="default" selected>Default</option>
                        <option value="theme1">Theme1</option>
                    </select> */}
                </div>
                <div className="min-w-40 m-auto flex flex-col gap-2 p-2">
                    <button type="button" className="hover:bg-[#FFF5D6]" onClick={()=>setGame(prev=>({...prev, difficulty:4}))} disabled={canClick}>for Kids</button>
                    <button type="button" className="hover:bg-[#FFF5D6]" onClick={()=>setGame(prev=>({...prev, difficulty:6}))} disabled={canClick}>Easy</button>
                    <button type="button" className="hover:bg-[#FFF5D6]" onClick={()=>setGame(prev=>({...prev, difficulty:9}))} disabled={canClick}>Medium</button>
                    <button type="button" className="hover:bg-[#FFF5D6]" onClick={()=>setGame(prev=>({...prev, difficulty:12}))} disabled={canClick}>Hard</button>
                </div>
            </div>
        </div>
    )
}