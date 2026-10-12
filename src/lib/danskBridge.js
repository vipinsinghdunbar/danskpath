// DanskPath ↔ /Dansk Bridge
// Integration layer for comprehensive curriculum continuity
// Connects DanskPath exercises to the broader /dansk education system

class DanskBridge {
  constructor() {
    this.basePath = process.env.REACT_APP_DANSK_API || '/dansk/api';
    this.isConnected = false;
    this.syncQueue = [];
    this.init();
  }

  async init() {
    try {
      // Check if /dansk API is available
      const response = await fetch(`${this.basePath}/health`, {
        method: 'GET',
        timeout: 5000,
      });

      if (response.ok) {
        this.isConnected = true;
        console.log('✓ DanskPath bridge connected to /dansk system');
        this.processSyncQueue();
      }
    } catch (error) {
      console.warn('⚠️ /dansk system not available, running in standalone mode');
      this.isConnected = false;
    }
  }

  // ==================== CURRICULUM ALIGNMENT ====================

  /**
   * Map DanskPath modules to /dansk curriculum levels
   */
  getCurriculumMapping() {
    return {
      danskpath: {
        modul1: { danskLevel: 'A1', standardCEFR: 'A1' },
        modul2: { danskLevel: 'A2', standardCEFR: 'A2' },
        modul3: { danskLevel: 'B1', standardCEFR: 'B1' },
        modul4: { danskLevel: 'B2', standardCEFR: 'B2' },
        modul5: { danskLevel: 'B2+', standardCEFR: 'B2-C1' },
        pd3: { danskLevel: 'PD3', standardCEFR: 'C1' },
      },
      /dansk: {
        'da-foundation': 'A1',
        'da-elementary': 'A2',
        'da-intermediate': 'B1',
        'da-upper-intermediate': 'B2',
        'da-advanced': 'C1',
      },
    };
  }

  /**
   * Get vocabulary packets from /dansk system aligned to current module
   */
  async getVocabularySynced(modulNumber) {
    if (!this.isConnected) {
      return this.getLocalVocabulary(modulNumber);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.basePath}/vocabulary/modul/${modulNumber}`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          source: 'dansk-system',
          vocabulary: data.words,
          metadata: data.metadata,
        };
      }
    } catch (error) {
      console.warn('Failed to fetch vocabulary from /dansk, using local:', error);
      return this.getLocalVocabulary(modulNumber);
    }
  }

  /**
   * Get grammar topics aligned with /dansk standards
   */
  async getGrammarSynced(topic, modulNumber) {
    if (!this.isConnected) {
      return this.getLocalGrammar(topic, modulNumber);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.basePath}/grammar/${topic}?level=modul${modulNumber}`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Failed to fetch grammar from /dansk:', error);
      return this.getLocalGrammar(topic, modulNumber);
    }
  }

  // ==================== LEARNING PATH SYNC ====================

  /**
   * Sync user progress with /dansk system
   */
  async syncProgress(userId, progress) {
    if (!this.isConnected) {
      // Queue for later sync
      this.syncQueue.push({ userId, progress, timestamp: Date.now() });
      return { synced: false, queued: true };
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.basePath}/users/${userId}/progress`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            danskpathProgress: progress,
            syncedAt: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        return { synced: true, response: await response.json() };
      }
    } catch (error) {
      console.error('Failed to sync progress:', error);
      this.syncQueue.push({ userId, progress, timestamp: Date.now() });
      return { synced: false, queued: true, error };
    }
  }

  /**
   * Get unified learning path combining DanskPath + /dansk recommendations
   */
  async getUnifiedPath(userId, currentModule) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.basePath}/users/${userId}/unified-path?current_module=modul${currentModule}`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          danskpathRecommendations: data.danskpath,
          danskSystemRecommendations: data.dansk,
          alignmentGaps: data.gaps,
          nextSteps: data.nextSteps,
        };
      }
    } catch (error) {
      console.warn('Failed to get unified path:', error);
      return null;
    }
  }

  // ==================== ASSESSMENT ALIGNMENT ====================

  /**
   * Validate DanskPath assessment against /dansk standards
   */
  async validateAssessment(assessmentResults) {
    if (!this.isConnected) {
      return { valid: true, synced: false };
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.basePath}/assessments/validate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: 'danskpath',
            results: assessmentResults,
          }),
        }
      );

      if (response.ok) {
        const validation = await response.json();
        return {
          valid: validation.isValid,
          alignedLevel: validation.cefrLevel,
          feedback: validation.feedback,
        };
      }
    } catch (error) {
      console.error('Failed to validate assessment:', error);
      return { valid: true, synced: false };
    }
  }

  // ==================== CONTENT SYNCHRONIZATION ====================

  /**
   * Download offline content packets from /dansk system
   */
  async downloadOfflineContent(modules = [1, 2, 3, 4, 5]) {
    if (!this.isConnected) {
      console.log('⚠️ /dansk not available, skipping offline sync');
      return { success: false, message: 'Not connected' };
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.basePath}/content/offline?modules=${modules.join(',')}`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `danskpath-offline-${Date.now()}.zip`;
        a.click();
        URL.revokeObjectURL(url);

        return { success: true, message: 'Content downloaded' };
      }
    } catch (error) {
      console.error('Failed to download offline content:', error);
      return { success: false, error };
    }
  }

  /**
   * Sync new content updates from /dansk system
   */
  async checkForUpdates() {
    if (!this.isConnected) return false;

    try {
      const token = localStorage.getItem('token');
      const lastSync = localStorage.getItem('lastDanskSync') || 0;

      const response = await fetch(
        `${this.basePath}/content/updates?since=${lastSync}`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const updates = await response.json();
        localStorage.setItem('lastDanskSync', Date.now().toString());
        return updates;
      }
    } catch (error) {
      console.error('Failed to check for updates:', error);
      return false;
    }
  }

  // ==================== TEACHER INTEGRATION ====================

  /**
   * Link DanskPath user to teacher account in /dansk system
   */
  async linkTeacher(teacherCode) {
    if (!this.isConnected) {
      return { success: false, message: 'Not connected to /dansk' };
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.basePath}/teachers/link`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ teacherCode }),
        }
      );

      if (response.ok) {
        return { success: true, teacher: await response.json() };
      } else if (response.status === 404) {
        return { success: false, message: 'Teacher code not found' };
      }
    } catch (error) {
      console.error('Failed to link teacher:', error);
      return { success: false, error };
    }
  }

  /**
   * Get teacher assignments and feedback
   */
  async getTeacherAssignments() {
    if (!this.isConnected) return [];

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${this.basePath}/teachers/assignments`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to fetch teacher assignments:', error);
      return [];
    }
  }

  // ==================== SYNC QUEUE MANAGEMENT ====================

  async processSyncQueue() {
    if (!this.isConnected || this.syncQueue.length === 0) return;

    const itemsToSync = [...this.syncQueue];
    this.syncQueue = [];

    for (const item of itemsToSync) {
      try {
        await this.syncProgress(item.userId, item.progress);
      } catch (error) {
        // Re-queue if failed
        this.syncQueue.push(item);
      }
    }

    localStorage.setItem('danskBridgeSyncQueue', JSON.stringify(this.syncQueue));
  }

  getSyncQueueLength() {
    return this.syncQueue.length;
  }

  clearSyncQueue() {
    this.syncQueue = [];
    localStorage.removeItem('danskBridgeSyncQueue');
  }

  // ==================== LOCAL FALLBACKS ====================

  getLocalVocabulary(modulNumber) {
    // Return local vocabulary if /dansk not available
    console.log(`Using local vocabulary for Modul ${modulNumber}`);
    return { source: 'danskpath-local', vocabulary: [] };
  }

  getLocalGrammar(topic, modulNumber) {
    // Return local grammar if /dansk not available
    console.log(`Using local grammar for ${topic} (Modul ${modulNumber})`);
    return { source: 'danskpath-local', grammar: [] };
  }

  // ==================== METADATA ====================

  getStatus() {
    return {
      connected: this.isConnected,
      syncQueueLength: this.syncQueue.length,
      lastSync: localStorage.getItem('lastDanskSync'),
      basePath: this.basePath,
    };
  }
}

// Initialize globally
export const danskBridge = new DanskBridge();

export default danskBridge;
