import { useState, useEffect } from 'react';
import { BookIcon, SettingsIcon, CheckIcon } from '../lib/icons';
import { curriculumData, getExercisesForSelection } from '../data/curriculum';

// WorkbookView — Exercise workbooks with PDF export
// Uses real CEFR-aligned curriculum exercises
// Users can practice online and download for offline use
// PDF includes: vocabulary lists, grammar exercises, reading, writing, answer keys

export default function WorkbookView({ setActive }) {
  const [currentModule, setCurrentModule] = useState(() => {
    const saved = localStorage.getItem('dansk_current_module');
    return saved ? parseInt(saved) : 1;
  });

  const [workbookType, setWorkbookType] = useState('complete');
  const [difficulty, setDifficulty] = useState('medium');
  const [exerciseCount, setExerciseCount] = useState(25);
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Use curriculum data as module content
  const moduleContent = curriculumData;

  const workbookTypes = [
    { id: 'complete', label: 'Complete Workbook', desc: 'Vocab + Grammar + Reading + Writing + Listening', items: 5 },
    { id: 'grammar', label: 'Grammar Workbook', desc: 'Grammar exercises only', items: 1 },
    { id: 'vocab', label: 'Vocabulary Workbook', desc: 'Word lists + fill-in exercises', items: 1 },
    { id: 'reading', label: 'Reading Workbook', desc: 'Comprehension exercises', items: 1 },
    { id: 'writing', label: 'Writing Workbook', desc: 'Essay + letter templates', items: 1 },
  ];

  const difficulties = [
    { id: 'easy', label: 'Easy', desc: 'Basic exercises, clear instructions' },
    { id: 'medium', label: 'Medium', desc: 'Standard difficulty, mixed topics' },
    { id: 'hard', label: 'Hard', desc: 'Challenging, advanced combinations' },
  ];

  // Get real exercises from curriculum
  const generateExercises = () => {
    return getExercisesForSelection(currentModule, workbookType, difficulty, exerciseCount);
  };

  // Export to PDF
  const handleExportPDF = async () => {
    setIsGenerating(true);
    try {
      // Dynamically import jsPDF
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      let yPosition = 20;
      const lineHeight = 7;
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;

      // Title page
      pdf.setFontSize(24);
      pdf.setFont(undefined, 'bold');
      pdf.text(`${moduleContent[currentModule].name} Workbook`, margin, yPosition);

      yPosition += 15;
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'normal');
      pdf.text(`CEFR Level: ${moduleContent[currentModule].level}`, margin, yPosition);

      yPosition += 10;
      pdf.setFontSize(11);
      pdf.text(`Type: ${workbookTypes.find(t => t.id === workbookType)?.label}`, margin, yPosition);
      yPosition += lineHeight;
      pdf.text(`Difficulty: ${difficulties.find(d => d.id === difficulty)?.label}`, margin, yPosition);
      yPosition += lineHeight;
      pdf.text(`Exercises: ${exerciseCount}`, margin, yPosition);

      // Table of contents
      yPosition += 20;
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Table of Contents', margin, yPosition);

      yPosition += 10;
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const sections = workbookType === 'complete'
        ? ['Vocabulary List', 'Grammar Exercises', 'Reading Comprehension', 'Writing Exercises', 'Answer Key']
        : ['Exercises', 'Answer Key'];

      sections.forEach((section, idx) => {
        yPosition += lineHeight;
        pdf.text(`${idx + 1}. ${section}`, margin + 5, yPosition);
      });

      // Vocabulary section
      if (['complete', 'vocab'].includes(workbookType)) {
        yPosition += 20;
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.text('Vocabulary', margin, yPosition);

        yPosition += 12;
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'normal');

        const vocab = moduleContent[currentModule]?.vocab || [];
        vocab.forEach((word, idx) => {
          yPosition += lineHeight * 1.2;
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          const text = `${word.danish} — ${word.english} (${word.category})`;
          pdf.text(text, margin + 5, yPosition);
        });
      }

      // Exercises section
      yPosition += 20;
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('Exercises', margin, yPosition);

      yPosition += 12;
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');

      const exercises = generateExercises();
      exercises.slice(0, 20).forEach((ex, idx) => {
        yPosition += lineHeight * 1.5;
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }

        // Exercise number and type
        const headerText = `${idx + 1}. [${ex.type.toUpperCase()}] ${ex.section || ''}`;
        pdf.setFont(undefined, 'bold');
        pdf.setFontSize(9);
        pdf.text(headerText, margin + 5, yPosition);

        // Question
        yPosition += lineHeight;
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(9);
        const questionWrapped = pdf.splitTextToSize(ex.question, contentWidth - 20);
        pdf.text(questionWrapped, margin + 10, yPosition);
        yPosition += questionWrapped.length * lineHeight;

        // Options if multiple choice
        if (ex.options && ex.options.length > 0) {
          yPosition += lineHeight * 0.5;
          pdf.setFontSize(8);
          ex.options.forEach(opt => {
            yPosition += lineHeight * 0.8;
            if (yPosition > pageHeight - 20) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(`○ ${opt}`, margin + 15, yPosition);
          });
        }
      });

      // Answer key
      if (includeAnswerKey) {
        yPosition += 15;
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.text('Answer Key', margin, yPosition);

        yPosition += 12;
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');

        exercises.slice(0, 20).forEach((ex, idx) => {
          yPosition += lineHeight * 1.8;
          if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = 20;
          }

          // Answer label
          pdf.setFont(undefined, 'bold');
          pdf.setFontSize(9);
          pdf.text(`${idx + 1}. Answer: ${ex.answer || '[See explanation]'}`, margin + 5, yPosition);

          // Explanation
          if (ex.explanation) {
            yPosition += lineHeight;
            pdf.setFont(undefined, 'normal');
            pdf.setFontSize(8);
            const explWrapped = pdf.splitTextToSize(`Explanation: ${ex.explanation}`, contentWidth - 20);
            pdf.text(explWrapped, margin + 10, yPosition);
            yPosition += explWrapped.length * lineHeight * 0.8;
          }
        });
      }

      // Save PDF
      const filename = `${moduleContent[currentModule].name.replace(' ', '_')}_${workbookType}_${difficulty}.pdf`;
      pdf.save(filename);

      // Show success message
      alert(`✅ Downloaded: ${filename}`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('❌ PDF export failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Practice online
  const handlePracticeOnline = () => {
    localStorage.setItem('dansk_workbook_mode', 'true');
    setActive('practice');
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#121417] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-2xl border-b border-black/5 lg:hidden">
        <div className="h-[56px] px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookIcon className="w-5 h-5 text-[#007AFF]" />
            <span className="text-[14px] font-[700]">Workbooks</span>
          </div>
          <button onClick={() => setActive('practice')} className="text-[11px] font-[600] bg-[#F2F2F7] px-3 py-1.5 rounded-full">
            ← Back
          </button>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden lg:block border-b border-black/5 bg-white">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Exercise Workbooks</h1>
              <p className="text-[#545A68]">Download workbooks to practice offline or print for pen-and-paper learning.</p>
            </div>
            <BookIcon className="w-16 h-16 text-[#007AFF]/20" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Module selector */}
        <div className="mb-8">
          <div className="text-[11px] font-[700] tracking-widest text-[#8A8F9C] mb-4 uppercase">Select Module</div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {Object.entries(moduleContent).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setCurrentModule(parseInt(key))}
                className={`p-4 rounded-[12px] border-2 transition-all ${
                  currentModule === parseInt(key)
                    ? 'border-[#007AFF] bg-[#007AFF]/10'
                    : 'border-black/10 bg-white hover:border-black/20'
                }`}
              >
                <div className="font-[600] text-[15px]">{val.name}</div>
                <div className="text-[11px] text-[#8A8F9C]">{val.level}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Workbook type selector */}
        <div className="mb-8">
          <div className="text-[11px] font-[700] tracking-widest text-[#8A8F9C] mb-4 uppercase">Workbook Type</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {workbookTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setWorkbookType(type.id)}
                className={`p-4 rounded-[12px] border-2 text-left transition-all ${
                  workbookType === type.id
                    ? 'border-[#007AFF] bg-[#007AFF]/10'
                    : 'border-black/10 bg-white hover:border-black/20'
                }`}
              >
                <div className="font-[600] text-[15px]">{type.label}</div>
                <div className="text-[12px] text-[#8A8F9C]">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty selector */}
        <div className="mb-8">
          <div className="text-[11px] font-[700] tracking-widest text-[#8A8F9C] mb-4 uppercase">Difficulty</div>
          <div className="grid grid-cols-3 gap-3">
            {difficulties.map(d => (
              <button
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                className={`p-3 rounded-[12px] border-2 transition-all text-center ${
                  difficulty === d.id
                    ? 'border-[#007AFF] bg-[#007AFF]/10'
                    : 'border-black/10 bg-white hover:border-black/20'
                }`}
              >
                <div className="font-[600] text-[15px]">{d.label}</div>
                <div className="text-[11px] text-[#8A8F9C]">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Exercise count */}
        <div className="mb-8">
          <label className="text-[11px] font-[700] tracking-widest text-[#8A8F9C] mb-4 block uppercase">
            Exercises: {exerciseCount}
          </label>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={exerciseCount}
            onChange={e => setExerciseCount(parseInt(e.target.value))}
            className="w-full h-2 bg-[#E5E8EF] rounded-full appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8A8F9C] mt-2">
            <span>10</span>
            <span>30</span>
            <span>50</span>
          </div>
        </div>

        {/* Options */}
        <div className="mb-8 bg-white rounded-[12px] border border-black/5 p-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeAnswerKey}
              onChange={e => setIncludeAnswerKey(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-[#007AFF] accent-[#007AFF]"
            />
            <span className="font-[500]">Include answer key in PDF</span>
          </label>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <button
            onClick={handleExportPDF}
            disabled={isGenerating}
            className="bg-[#007AFF] text-white font-[600] py-4 rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#0051D5] disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <span className="text-[18px]">↓</span>
                Download PDF
              </>
            )}
          </button>

          <button
            onClick={handlePracticeOnline}
            className="bg-white border-2 border-[#007AFF] text-[#007AFF] font-[600] py-4 rounded-[12px] hover:bg-[#007AFF]/5 transition-all"
          >
            Practice Online
          </button>
        </div>

        {/* Info box */}
        <div className="mt-8 bg-[#007AFF]/10 rounded-[12px] border border-[#007AFF]/20 p-6">
          <h3 className="font-[600] mb-2 text-[#007AFF]">About Workbooks</h3>
          <ul className="text-[14px] text-[#545A68] space-y-2">
            <li>✓ Auto-generated exercises based on your level.</li>
            <li>✓ Practice online directly or print the PDF.</li>
            <li>✓ Optional answer key for self-grading.</li>
            <li>✓ Customizable difficulty and exercise count.</li>
            <li>✓ Works offline — download once, use anytime.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
