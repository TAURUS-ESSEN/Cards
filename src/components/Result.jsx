export default function Result({turn, uniq, endGame, newGame}) {

    return (
        <>
            <div className="menu flex flex-col gap-2 p-2 border">
                    {endGame.type !== ''? `You ${endGame.type} &` : '' } you make {endGame.type === '' ? turn : uniq} turns 
                    <button onClick={newGame}>Play again</button>
            </div>
        </>
    )
}