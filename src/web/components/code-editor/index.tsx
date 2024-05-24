import MonacoEditor from 'react-monaco-editor'

const CodeEditor = ({ theme = "vs-dark", code = '' }) => {
  return (
    <MonacoEditor
      width="100%"
      height='100%'
      language="typescript"
      theme={theme}
      value={code}
      // onChange={onChangeHandle}
      options={{
        selectOnLineNumbers: true,
        matchBrackets: "near",
      }}
    />
  )
}

export default CodeEditor