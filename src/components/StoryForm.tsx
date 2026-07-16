"use client";

import { useActionState } from "react";
import { submitStory, type StoryFormState } from "@/app/kirim-cerita/actions";
import { Icon } from "@/components/Icon";

const initialState: StoryFormState = { status: "idle", message: "" };

export function StoryForm() {
  const [state, formAction, pending] = useActionState(submitStory, initialState);
  return (
    <form action={formAction} className="story-form">
      <div className="form-grid">
        <label>Nama lengkap<input name="name" required minLength={2} placeholder="Nama Anda" /></label>
        <label>Email<input name="email" required type="email" placeholder="nama@email.com" /></label>
        <label>Nomor WhatsApp<input name="phone" placeholder="08xxxxxxxxxx" /></label>
        <label>Topik<select name="topic" required defaultValue=""><option value="" disabled>Pilih topik</option><option>Pendidikan Berbasis Fitrah</option><option>Parenting</option><option>Aqil Baligh</option><option>Pendidikan Keluarga</option><option>Cerita Komunitas</option><option>Panduan Praktis</option></select></label>
      </div>
      <label>Judul cerita<input name="title" required minLength={8} maxLength={120} placeholder="Judul yang menggambarkan cerita Anda" /></label>
      <label>Cerita<textarea name="story" required minLength={100} rows={12} placeholder="Ceritakan pengalaman, pembelajaran, tantangan, dan perubahan yang Anda rasakan…" /></label>
      <label className="checkbox-row"><input name="consent" type="checkbox" value="yes" required/><span>Saya mengizinkan tim Iqrolife menghubungi saya dan menyunting cerita ini sebelum diterbitkan.</span></label>
      {state.message && <div className={`form-message form-message--${state.status}`}><Icon name={state.status === "success" ? "check" : "leaf"} width={20} height={20}/>{state.message}</div>}
      {state.errors && <ul className="form-errors">{Object.values(state.errors).flat().map((error) => <li key={error}>{error}</li>)}</ul>}
      <button className="button button--wide" disabled={pending} type="submit"><Icon name="send" width={18} height={18}/>{pending ? "Mengirim…" : "Kirim Cerita"}</button>
    </form>
  );
}
