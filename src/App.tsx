@@ .. @@
 import React from 'react'
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
-import Layout from './components/Layout'
+import Layout from './components/Layout.tsx'
 import Dashboard from './pages/Dashboard'
 import Trading from './pages/Trading'
 import Analytics from './pages/Analytics'
 import Settings from './pages/Settings'
+import { Toaster } from 'react-hot-toast'

 function App() {
   return (
-    <Router>
-      <Layout>
-        <Routes>
-          <Route path="/" element={<Dashboard />} />
-          <Route path="/trading" element={<Trading />} />
-          <Route path="/analytics" element={<Analytics />} />
-          <Route path="/settings" element={<Settings />} />
-        </Routes>
-      </Layout>
-    </Router>
+    <>
+      <Router>
+        <Layout>
+          <Routes>
+            <Route path="/" element={<Dashboard />} />
+            <Route path="/trading" element={<Trading />} />
+            <Route path="/analytics" element={<Analytics />} />
+            <Route path="/settings" element={<Settings />} />
+          </Routes>
+        </Layout>
+      </Router>
+      <Toaster position="top-right" />
+    </>
   )
 }

 export default App