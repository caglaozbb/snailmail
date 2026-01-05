import TitleBar from "./components/TitleBar";
import FriendsList from "./components/FriendsList";
import ChatWindows from "./components/ChatWindows";
import AvatarPanel from "./components/AvatarPanel";
import './assets/main.css'

function App() {
  return (
    <>
 <div className="app">
      <TitleBar />

      <div className="main">
        <FriendsList />
        <ChatWindows />
        <AvatarPanel />
      </div>
    </div>
    </>
  )
}

export default App
