import { useState, useRef, useEffect } from 'react';
import { AlertCircle, Mic, Square, Play, Download, Trash2 } from 'lucide-react';

export default function SpeakingView({ topic, onComplete }) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioElementRef = useRef(null);
  const timerRef = useRef(null);

  // Browser support check
  useEffect(() => {
    const checkBrowserSupport = async () => {
      try {
        const constraints = { audio: true, video: false };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        // Stop the stream immediately (we just wanted to check permission)
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        setError(`Microphone access denied: ${err.message}`);
      }
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      checkBrowserSupport();
    } else {
      setError('Your browser does not support audio recording. Use Chrome, Firefox, Edge, or Safari on iOS 14.5+');
    }
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000,
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        clearInterval(timerRef.current);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.onerror = (e) => {
        setError(`Recording error: ${e.error}`);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
      setRecordingTime(0);

      // Timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      setError(`Failed to start recording: ${err.message}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const playAudio = () => {
    if (audioElementRef.current) {
      if (isPlaying) {
        audioElementRef.current.pause();
      } else {
        audioElementRef.current.play();
      }
    }
  };

  const downloadAudio = () => {
    if (audioURL) {
      const a = document.createElement('a');
      a.href = audioURL;
      a.download = `speaking-practice-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const deleteRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
      setRecordingTime(0);
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#121417] mb-2">Speaking Practice</h2>
        <p className="text-[#8E8E93]">Record yourself speaking on the topic below.</p>
      </div>

      {/* Topic */}
      <div className="bg-[#F2F2F7] rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-[#007AFF] mb-3">Today's Topic</h3>
        <p className="text-xl font-semibold text-[#121417] mb-4">{topic.title || 'Speak about your favorite hobby'}</p>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#121417]">Prompts:</p>
          <ul className="space-y-1">
            {(topic.prompts || ['Tell us about it', 'Why do you like it?', 'How often do you do it?']).map((prompt, i) => (
              <li key={i} className="text-[#8E8E93] text-sm">• {prompt}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 bg-white rounded-lg p-4 border border-[#E5E5EA]">
          <p className="text-sm text-[#8E8E93] mb-2">Target length: {topic.targetLength || '2-3 minutes'}</p>
          <p className="text-sm text-[#34C759] font-semibold">✓ Aim to use new vocabulary from this module</p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-[#FF3B30]/10 rounded-lg border border-[#FF3B30]/20 flex gap-3">
          <AlertCircle className="w-5 h-5 text-[#FF3B30] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#FF3B30]">{error}</div>
        </div>
      )}

      {/* Recording controls */}
      <div className="mb-8">
        <div className="flex gap-3 mb-4">
          {!recording && !audioURL && (
            <button
              onClick={startRecording}
              className="flex-1 bg-[#007AFF] text-white rounded-full py-4 px-6 font-semibold text-lg flex items-center justify-center gap-3 hover:bg-[#0051D5] active:scale-95 transition-all"
            >
              <Mic className="w-6 h-6" />
              Start Recording
            </button>
          )}

          {recording && (
            <>
              <div className="flex-1 bg-[#FF3B30] text-white rounded-full py-4 px-6 font-semibold text-lg flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                Recording: {formatTime(recordingTime)}
              </div>
              <button
                onClick={stopRecording}
                className="bg-[#121417] text-white rounded-full py-4 px-6 font-semibold text-lg flex items-center justify-center gap-3 hover:bg-[#1C1C21] active:scale-95 transition-all"
              >
                <Square className="w-5 h-5" />
                Stop
              </button>
            </>
          )}
        </div>
      </div>

      {/* Playback and actions */}
      {audioURL && (
        <div className="bg-[#F2F2F7] rounded-xl p-6 mb-8">
          <h4 className="font-semibold text-[#121417] mb-4">Your Recording</h4>

          <audio
            ref={audioElementRef}
            src={audioURL}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="w-full mb-4 rounded-lg"
          />

          <div className="flex gap-2 mb-4">
            <button
              onClick={playAudio}
              className="flex-1 bg-[#007AFF] text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2 hover:bg-[#0051D5] active:scale-95 transition-all"
            >
              <Play className="w-5 h-5" />
              {isPlaying ? 'Playing...' : 'Play'}
            </button>

            <button
              onClick={downloadAudio}
              className="flex-1 bg-[#5856D6] text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2 hover:bg-[#4C4CBF] active:scale-95 transition-all"
            >
              <Download className="w-5 h-5" />
              Download
            </button>

            <button
              onClick={deleteRecording}
              className="bg-[#FF3B30] text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2 hover:bg-[#E63427] active:scale-95 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-[#8E8E93]">
            💡 Tips: Listen to your recording and self-evaluate. Did you use the new vocabulary? Was your pronunciation clear? Could you maintain eye contact with an imaginary examiner?
          </p>
        </div>
      )}

      {/* Self-assessment */}
      {audioURL && (
        <div className="bg-white rounded-xl p-6 border border-[#E5E5EA]">
          <h4 className="font-semibold text-[#121417] mb-4">Self-Assessment Checklist</h4>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded" />
              <span className="text-sm text-[#121417]">I stayed on topic and answered all prompts.</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded" />
              <span className="text-sm text-[#121417]">I used new vocabulary from this module.</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded" />
              <span className="text-sm text-[#121417]">My pronunciation was clear and natural.</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded" />
              <span className="text-sm text-[#121417]">I could speak for the target time without long pauses.</span>
            </label>
          </div>

          <button
            onClick={() => onComplete && onComplete()}
            className="w-full mt-6 bg-[#34C759] text-white rounded-lg py-3 px-4 font-semibold hover:bg-[#2AA94E] active:scale-95 transition-all"
          >
            Mark Complete
          </button>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 pt-6 border-t border-[#E5E5EA]">
        <h4 className="font-semibold text-[#121417] mb-3">Recording Tips</h4>
        <ul className="space-y-2 text-sm text-[#8E8E93]">
          <li>✓ Find a quiet place with minimal background noise.</li>
          <li>✓ Speak at a natural pace — don't rush.</li>
          <li>✓ Pause for breath and thought; long silences are okay.</li>
          <li>✓ Correct yourself naturally if you make a mistake — that's okay.</li>
          <li>✓ Aim for the target length but quality over quantity.</li>
          <li>✓ Review your recording to track improvement over time.</li>
        </ul>
      </div>
    </div>
  );
}
