import React, { useState, useEffect } from 'react';
import {
  Key,
  Database,
  Trash2,
  Download,
  Upload,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Cpu,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { GlassDialog } from '@/components/ui/GlassDialog';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import {
  getAISettings,
  saveAISettings,
  clearAISettings,
  testAIConnection,
} from '@/lib/ai/aiReviewService';
import { AISettings } from '@/types';
import { useProgress } from '@/app/providers/ProgressContext';
import { useToast } from '@/components/ui/Toast';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { progress, setStudentName, resetProgress, exportProgress, importProgress } = useProgress();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'ai' | 'profile' | 'data'>('ai');
  const [aiSettings, setAiSettings] = useState<AISettings>(getAISettings);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const [nameInput, setNameInput] = useState(progress.studentName);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAiSettings(getAISettings());
      setNameInput(progress.studentName);
      setTestResult(null);
    }
  }, [isOpen, progress.studentName]);

  const handleSaveAISettings = () => {
    saveAISettings(aiSettings);
    toast.success('AI Settings Saved', 'Your configuration is active for this session.');
    onClose();
  };

  const handleClearAISettings = () => {
    clearAISettings();
    setAiSettings(getAISettings());
    setTestResult(null);
    toast.info('AI Credentials Cleared', 'In-memory and session credentials removed.');
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testAIConnection(aiSettings);
      setTestResult(res);
      if (res.success) {
        toast.success('Connection Successful', res.message);
      } else {
        toast.error('Connection Failed', res.message);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error during connection test.';
      setTestResult({ success: false, message: msg });
      toast.error('Connection Failed', msg);
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveName = () => {
    setStudentName(nameInput);
    toast.success('Profile Updated', `Display name saved as "${nameInput}".`);
  };

  const handleExportJSON = () => {
    const json = exportProgress();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rustforge_progress_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Export Successful', 'Downloaded your learning progress JSON file.');
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) {
      toast.error('Import Failed', 'Please paste valid progress JSON.');
      return;
    }
    const res = importProgress(importJsonText);
    if (res.success) {
      toast.success('Import Successful', 'Your learning progress has been restored.');
      setShowImportArea(false);
      setImportJsonText('');
      onClose();
    } else {
      toast.error('Import Error', res.error || 'Failed to parse JSON.');
    }
  };

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    toast.warning('Progress Reset', 'All lesson completions and exam records have been cleared.');
    onClose();
  };

  return (
    <GlassDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Platform Settings & Preferences"
      description="Configure AI code review endpoints, your student profile, and local data persistence."
      maxWidth="lg"
    >
      <div className="flex border-b border-white/10 mb-4 gap-2">
        <button
          onClick={() => setActiveTab('ai')}
          className={`pb-2.5 px-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'ai'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" /> AI Review
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-2.5 px-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Key className="w-4 h-4" /> Student Profile
        </button>
        <button
          onClick={() => setActiveTab('data')}
          className={`pb-2.5 px-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'data'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" /> Data & Backup
        </button>
      </div>

      {activeTab === 'ai' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200/90 leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-300">Client-Side Security Notice</p>
              <p className="mt-0.5">
                RustForge is 100% static with no private backend server. AI reviews are sent directly from your browser.
                Keys are kept in-memory by default. Use a restricted API key with budget caps.
              </p>
            </div>
          </div>

          <GlassInput
            label="API Base URL (OpenAI-Compatible)"
            value={aiSettings.apiBaseUrl}
            onChange={(e) => setAiSettings({ ...aiSettings, apiBaseUrl: e.target.value })}
            placeholder="https://api.openai.com/v1"
            helperText="Supports OpenAI, DeepSeek, OpenRouter, Ollama, LocalAI, or any v1/chat/completions endpoint."
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              API Key
            </label>
            <div className="relative flex items-center">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={aiSettings.apiKey}
                onChange={(e) => setAiSettings({ ...aiSettings, apiKey: e.target.value })}
                placeholder="sk-..."
                className="w-full bg-[#0f172a]/80 text-slate-100 placeholder-slate-500 rounded-xl border border-white/15 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 text-slate-400 hover:text-slate-200"
                aria-label="Toggle password visibility"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <GlassInput
              label="Model Identifier"
              value={aiSettings.model}
              onChange={(e) => setAiSettings({ ...aiSettings, model: e.target.value })}
              placeholder="gpt-4o-mini"
            />
            <GlassInput
              label="Timeout (Milliseconds)"
              type="number"
              value={aiSettings.requestTimeoutMs}
              onChange={(e) => setAiSettings({ ...aiSettings, requestTimeoutMs: Number(e.target.value) || 20000 })}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="persistSession"
              checked={aiSettings.persistToSession}
              onChange={(e) => setAiSettings({ ...aiSettings, persistToSession: e.target.checked })}
              className="rounded bg-slate-800 border-white/20 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor="persistSession" className="text-xs text-slate-300 cursor-pointer">
              Remember credentials in <code className="text-orange-300">sessionStorage</code> (cleared when browser tab closes)
            </label>
          </div>

          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                testResult.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <GlassButton
              variant="danger"
              size="sm"
              onClick={handleClearAISettings}
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Clear
            </GlassButton>
            <div className="flex gap-2">
              <GlassButton
                variant="outline"
                size="sm"
                onClick={handleTestConnection}
                isLoading={isTesting}
              >
                Test Connection
              </GlassButton>
              <GlassButton variant="primary" size="sm" onClick={handleSaveAISettings}>
                Save Configuration
              </GlassButton>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Your student name is displayed on your self-assessed RustForge completion certificate.
          </p>
          <GlassInput
            label="Student Display Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="e.g. Ferris the Rustacean"
          />
          <div className="flex justify-end pt-2">
            <GlassButton variant="primary" size="sm" onClick={handleSaveName}>
              Save Name
            </GlassButton>
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Local Storage Persistence</p>
              <p className="mt-0.5">
                All your completed lessons, quiz scores, exercise drafts, and exam attempts are stored locally in your browser.
                Export your progress to migrate to another device.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <GlassButton
              variant="secondary"
              onClick={handleExportJSON}
              leftIcon={<Download className="w-4 h-4 text-orange-400" />}
            >
              Export JSON
            </GlassButton>
            <GlassButton
              variant="outline"
              onClick={() => setShowImportArea(!showImportArea)}
              leftIcon={<Upload className="w-4 h-4 text-blue-400" />}
            >
              Import JSON
            </GlassButton>
          </div>

          {showImportArea && (
            <div className="p-3 rounded-xl bg-slate-900 border border-white/15 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Paste Progress JSON:</label>
              <textarea
                rows={4}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{"schemaVersion": 1, ...}'
                className="w-full bg-[#080b12] text-xs font-mono p-2.5 rounded-lg border border-white/15 text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <div className="flex justify-end gap-2">
                <GlassButton size="sm" variant="ghost" onClick={() => setShowImportArea(false)}>
                  Cancel
                </GlassButton>
                <GlassButton size="sm" variant="primary" onClick={handleImportSubmit}>
                  Restore Progress
                </GlassButton>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10">
            {!showResetConfirm ? (
              <GlassButton
                variant="danger"
                size="sm"
                onClick={() => setShowResetConfirm(true)}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Reset All Learning Progress
              </GlassButton>
            ) : (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <p className="text-xs text-rose-300 font-semibold">
                  Are you sure? This will permanently delete your completed lessons, quiz scores, and exam attempts from this browser.
                </p>
                <div className="flex gap-2">
                  <GlassButton size="sm" variant="danger" onClick={handleConfirmReset}>
                    Yes, Reset Everything
                  </GlassButton>
                  <GlassButton size="sm" variant="ghost" onClick={() => setShowResetConfirm(false)}>
                    Cancel
                  </GlassButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </GlassDialog>
  );
};
