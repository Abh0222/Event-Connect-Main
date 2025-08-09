import Dropzone from '@/components/uploader/Dropzone'
import { storage, db } from '@/lib/firebase'

export default function Creator(){
  async function handleUpload(files: File[]){
    if(!storage){ alert('Storage not configured'); return }
    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage')
    const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')

    const urls: string[] = []
    for(const f of files){
      const key = `events/${Date.now()}-${f.name}`
      const r = ref(storage, key)
      await uploadBytes(r, f)
      const url = await getDownloadURL(r)
      urls.push(url)
    }

    if(db){
      await addDoc(collection(db,'uploads'), { urls, createdAt: serverTimestamp() })
      alert(`Uploaded ${urls.length} file(s)`)
    }
  }

  return (
    <section className="container" style={{padding:'24px 0'}}>
      <h2>Creator Admin</h2>
      <p style={{marginTop:8}}>Upload portfolio and manage leads here.</p>
      <div className="card" style={{padding:16, marginTop:12}}>
        <h3>Upload Wizard</h3>
        <Dropzone onFiles={handleUpload} />
      </div>

      <div className="card" style={{padding:16, marginTop:12}}>
        <h3>Event Publishing</h3>
        <p>Create a new portfolio event with hero and gallery images.</p>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          <a className="btn primary" href="/creator/new">New Event</a>
          <a className="btn ghost" href="/creator/events">Manage Events</a>
          <a className="btn ghost" href="/creator/leads">Leads Inbox</a>
        </div>
      </div>
    </section>
  )
}

