export default function Menu({game, setGame, theme, setTheme}) {
        const canClick = game.type === '' ? true : false 

    return (
        <div className="">
            <div className="menu flex flex-col gap-2 p-2 border">
                <div className="menu flex gap-2 p-2 ">
                    <button type="button" onClick={()=> setGame(prev=>({...prev, type: 1}))} className={game.type === 1 ? 'bg-amber-200' : '' }>Pair</button> 
                    <button type="button" onClick={()=> setGame(prev=>({...prev, type: 2}))} className={game.type === 2 ? 'bg-amber-200' : '' }>UnPair</button>
                </div>
                <div>
                    <select value={theme} onChange={(e)=>setTheme(e.target.value)}>
                        <option value="default" selected>Default</option>
                        <option value="theme1">Theme1</option>
                    </select>
                </div>
                <div className="menu flex flex-col gap-2 p-2  ">
                    <button onClick={()=>setGame(prev=>({...prev, difficulty:4}))} disabled={canClick}>for Kids</button>
                    <button onClick={()=>setGame(prev=>({...prev, difficulty:6}))} disabled={canClick}>Easy</button>
                    <button onClick={()=>setGame(prev=>({...prev, difficulty:9}))} disabled={canClick}>Medium</button>
                    <button onClick={()=>setGame(prev=>({...prev, difficulty:12}))} disabled={canClick}>Hard</button>
                </div>
            </div>
        </div>
    )
}