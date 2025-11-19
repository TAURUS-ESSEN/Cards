export default function Menu({game, setGame}) {
        const canClick = game.type === '' ? true : false 
   
    return (
        <>
            <div className="menu flex flex-col gap-2 p-2 border">
                <div className="menu flex gap-2 p-2 ">
                    <button type="button" onClick={()=> setGame(prev=>({...prev, type: 1}))} className={game.type === 1 ? 'bg-amber-200' : '' }>Pair</button> 
                    <button type="button" onClick={()=> setGame(prev=>({...prev, type: 2}))} className={game.type === 2 ? 'bg-amber-200' : '' }>unPair</button>
                </div>
                <div className="menu flex flex-col gap-2 p-2  ">
                    <button onClick={()=>setGame(prev=>({...prev, difficulty:4}))} disabled={canClick}>Easy</button>
                    <button onClick={()=>setGame(prev=>({...prev, difficulty:6}))} disabled={canClick}>Medium</button>
                    <button onClick={()=>setGame(prev=>({...prev, difficulty:8}))} disabled={canClick}>Hard</button>
                </div>
            </div>
        </>
    )
}