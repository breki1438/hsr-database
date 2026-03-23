export default function Home() {
    return (
        <div className={"w-full mx-auto flex flex-col"}>
            <span className={"text-5xl font-bold italic"}>CHARACTERS</span>
            <span className={"w-full bg-white h-0.5"}></span>
            <div className={"w-full p-4"}>
                <div className={"text-2xl font-bold text-white w-30 bg-gray-700 flex flex-col rounded-md drop-shadow-lg hover:outline-2 outline-amber-300"}>
                    <div className={"w-full h-30 rounded-t-md"}>img</div>
                    <div className={"w-full bg-gray-800 text-center rounded-b-md"}>Acheron</div>
                </div>
            </div>

        </div>
    );
}
