#!/usr/bin/env python3
"""
beat_sync.py — Audio beat detection & scene cut quantizer for Remotion videos.

Analyzes an audio file (e.g. background music or full mix) using Librosa to detect
the tempo (BPM) and precise beat grid / onset times. It can snap visual cut points
in beats.json to the nearest musical downbeat/transient so cuts look snappy and rhythmic.

Usage:
  python tools/beat_sync.py --audio media/library/music/clips/lullaby-tender.mp3
  python tools/beat_sync.py --audio media/library/music/clips/lullaby-tender.mp3 --beats shorts/short-14-twinkle/beats.json
"""
import argparse
import json
import os
import sys

def analyze_audio_beats(audio_path):
    import librosa
    import numpy as np

    print(f"[BeatSync] Loading audio: {audio_path}")
    y, sr = librosa.load(audio_path, sr=None)
    duration = librosa.get_duration(y=y, sr=sr)
    
    # Tempo & beat tracking
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
    beat_times = librosa.frames_to_time(beat_frames, sr=sr)
    
    # Onset detection for sharp percussive hits
    onset_frames = librosa.onset.onset_detect(y=y, sr=sr, wait=1, pre_avg=1, post_avg=1, pre_max=1, post_max=1)
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)
    
    if isinstance(tempo, np.ndarray):
        tempo = float(tempo[0]) if len(tempo) > 0 else 120.0
    else:
        tempo = float(tempo)
        
    print(f"[BeatSync] Detected Tempo: {tempo:.1f} BPM | Total Beats: {len(beat_times)} | Duration: {duration:.2f}s")
    return {
        "tempo": round(tempo, 1),
        "duration": round(duration, 2),
        "beat_times": [round(float(t), 3) for t in beat_times],
        "onset_times": [round(float(t), 3) for t in onset_times[:50]],
    }

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--audio", required=True, help="Path to music or audio file")
    ap.add_argument("--beats", help="Optional beats.json path to snap cut points")
    ap.add_argument("--tolerance", type=float, default=0.35, help="Snap tolerance in seconds (default 0.35s)")
    args = ap.parse_args()

    data = analyze_audio_beats(args.audio)
    
    if args.beats and os.path.exists(args.beats):
        with open(args.beats, "r", encoding="utf-8") as f:
            beats_data = json.load(f)
            
        fps = beats_data.get("format", {}).get("fps", 30)
        snapped = 0
        for line in beats_data.get("vo", []):
            start = line["start"]
            # find closest beat
            if data["beat_times"]:
                closest = min(data["beat_times"], key=lambda b: abs(b - start))
                diff = abs(closest - start)
                if diff <= args.tolerance:
                    line["snapped_beat"] = closest
                    line["snapped_frame"] = int(round(closest * fps))
                    snapped += 1
        print(f"[BeatSync] Successfully analyzed beats and mapped {snapped} transitions.")
        out_json = args.beats.replace(".json", "-snapped.json")
        with open(out_json, "w", encoding="utf-8") as f:
            json.dump(beats_data, f, indent=2)
        print(f"[BeatSync] Wrote snapped beat map -> {out_json}")
    else:
        print("[BeatSync] Beat grid sample (first 10 beats):", data["beat_times"][:10])

if __name__ == "__main__":
    main()
