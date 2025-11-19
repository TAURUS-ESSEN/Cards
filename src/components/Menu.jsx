export default function Menu({setDifficulty}) {
    return (
        <>
            <div className="menu flex flex-col gap-2 p-2 border">
                <button onClick={()=>setDifficulty(4)}>Easy</button>
                <button onClick={()=>setDifficulty(6)}>Medium</button>
                <button onClick={()=>setDifficulty(8)}>Hard</button>
            </div>
        </>
    )
}