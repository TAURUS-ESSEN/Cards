export default function Result({ turn, allCards, theme, uniq, game, endGame, newGame, records }) {

    const STORAGE_KEY = 'catGameRecords';
    const score = game.type === 1 ? turn : uniq;

    const prevRecord = records[game.type]?.[game.difficulty];

    if (prevRecord === null || score < prevRecord) {

        const updated = {
            ...records,
            [game.type]: {
                ...records[game.type],
                [game.difficulty]: score
            }
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    return (
        <div className="mb-5 max-w-70 flex flex-col justify-center items-center gap-2 bg-white text-gray-600 shadow-field p-3 rounded-xl ">
            {game.type === 1 && <>
            <span className="text-xl text-center">🐾 You matched all the cats in <strong>{turn}</strong> turns!</span>
            <img src={`${theme}/pair.webp`} className="rounded-xl w-full"/>
            <span className="text-xl"> Best Score is <strong>{prevRecord}</strong> turns</span>
            </>}
            {game.type === 2 && <>
            <span>You <strong>{endGame.type !== '' ? ` ${endGame.type} ` : ''} </strong></span>
            <img src={`${theme}/${endGame.type === 'win' ? 'win.webp' : 'loose.webp'}`} className="rounded-xl w-fit"/>
            <p>You found <strong>{score}</strong> unique cats out of {allCards.length}</p> 
            </>
            }
            <button type="button" onClick={newGame} className="w-fit border rounded-lg px-4 shadow-soft border-white bg-amber-500 text-white font-bold hover:bg-amber-400 hover:shadow">Play again</button>
        </div>
    );
}
