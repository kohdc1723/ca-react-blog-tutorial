import { useState } from "react";
import Modal from "./components/Modal";
import "./App.css";

function App() {
    const [posts, setPosts] = useState([
        {
            title: "React.js",
            timestamp: new Date("2023-07-15"),
            likes: 0,
            contents: "React.js is ..."
        },
        {
            title: "Vue.js",
            timestamp: new Date("2023-07-10"),
            likes: 0,
            contents: "Vue.js is ..."
        },
        {
            title: "Angular.js",
            timestamp: new Date("2023-07-05"),
            likes: 0,
            contents: "Angular.js is ..."
        },
    ]);
    const [sort, setSort] = useState("title");
    const [modal, setModal] = useState(null);
    const [input, setInput] = useState({ title: "", contents: "" });

    const increaseLikesOf = (index) => {
        // deep copy
        const copyOfPosts = [...posts]; // create a new array with the same contents
        ++copyOfPosts[index].likes;

        // works only when the reference is changed
        setPosts(copyOfPosts);
    };

    const handleSort = () => {
        const copyOfPosts = [...posts];

        if (sort === "date") {
            copyOfPosts.sort((a, b) => b.timestamp - a.timestamp);

            setSort("title");
            setPosts(copyOfPosts);
        } else {
            copyOfPosts.sort((a, b) => a.title.localeCompare(b.title));

            setSort("date");
            setPosts(copyOfPosts);
        }
    }

    const handleDelete = (index) => {
        const copyOfPosts = [...posts];
        copyOfPosts.splice(index, 1);

        setPosts(copyOfPosts);
    };

    return (
        <div className="App">
            <div className="black-nav">
                <h2>React Blog</h2>
            </div>

            <button onClick={handleSort}>Sort by {sort}</button>

            <div className="input-form">
                <input type="text" placeholder="title" onChange={e => setInput({ ...input, title: e.target.value })} />
                <textarea placeholder="contents" onChange={e => setInput({ ...input, contents: e.target.value })} />
                <button onClick={() => {
                    setPosts([...posts, {
                        title: input.title,
                        timestamp: new Date(Date.now()),
                        likes: 0,
                        contents: input.contents
                    }]);
                }}>Submit</button>
            </div>

            {posts.map((post, index) => (
                <div key={index} className="list">
                    <h4>
                        <p onClick={() => setModal(post)}>{post.title}</p>
                        <span onClick={() => increaseLikesOf(index)}>👍</span>
                        <span>{post.likes}</span>
                    </h4>
                    <p>{post.timestamp.toLocaleDateString()}</p>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
            ))}

            {modal && (
                <Modal modal={modal} setModal={setModal} />
            )}
        </div>
    );
};

export default App;
