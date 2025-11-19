export default function Result({turn, newGame}) {

    return (
        <>
            <div className="menu flex flex-col gap-2 p-2 border">
                    Your result ist {turn}
                    <button onClick={newGame}>Play again</button>
            </div>
        </>
    )
}