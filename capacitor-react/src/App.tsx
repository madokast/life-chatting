import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* 顶部导航栏 */}
      <header className="header">
        <h1>Life Chatting</h1>
      </header>

      {/* 主要内容区域 */}
      <main className="main-content">
        <div className="content-section">
          <h2>欢迎使用 Life Chatting</h2>
          <p>一个融合日记记录与 AI 智能对话的人生管理应用</p>
          
          <div className="features">
            <div className="feature-card">
              <h3>📝 日记记录</h3>
              <p>便捷撰写日记，支持附件上传，时间线展示</p>
            </div>
            
            <div className="feature-card">
              <h3>🤖 AI 智能对话</h3>
              <p>AI 阅读用户日记，提供个性化人生建议</p>
            </div>
            
            <div className="feature-card">
              <h3>🔒 本地优先</h3>
              <p>所有数据默认存储在本地，保护隐私安全</p>
            </div>
          </div>
        </div>
      </main>

      {/* 底部导航栏 */}
      <footer className="footer">
        <div className="nav-item">
          <span>日记</span>
        </div>
        <div className="nav-item">
          <span>聊天</span>
        </div>
        <div className="nav-item">
          <span>设置</span>
        </div>
      </footer>
    </div>
  )
}

export default App
