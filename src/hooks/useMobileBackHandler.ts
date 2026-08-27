import { useEffect, useRef, useState, useCallback } from 'react';
import { MainTabType } from '../components/SidebarNav';

export interface MobileBackHandlerProps {
  activeTab: MainTabType;
  setActiveTab: (tab: MainTabType) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  profileDrawerOpen: boolean;
  setProfileDrawerOpen: (open: boolean) => void;
  selectedNodeData: any;
  setSelectedNodeData: (data: any) => void;
  selectedInformantId: string | null;
  setSelectedInformantId: (id: string | null) => void;
}

export function useMobileBackHandler({
  activeTab,
  setActiveTab,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  profileDrawerOpen,
  setProfileDrawerOpen,
  selectedNodeData,
  setSelectedNodeData,
  selectedInformantId,
  setSelectedInformantId,
}: MobileBackHandlerProps) {
  const [showExitToast, setShowExitToast] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Track if state update was initiated by browser popstate to prevent double pushState
  const isFromPopstateRef = useRef(false);
  
  // Track refs to always have latest state in popstate event listener
  const stateRef = useRef({
    activeTab,
    mobileSidebarOpen,
    profileDrawerOpen,
    selectedNodeData,
    selectedInformantId,
  });

  useEffect(() => {
    stateRef.current = {
      activeTab,
      mobileSidebarOpen,
      profileDrawerOpen,
      selectedNodeData,
      selectedInformantId,
    };
  }, [activeTab, mobileSidebarOpen, profileDrawerOpen, selectedNodeData, selectedInformantId]);

  // Initialize history state on mount
  useEffect(() => {
    try {
      const initialTab = (window.location.hash.replace('#', '') as MainTabType) || 'hmm_flow';
      const validTabs: MainTabType[] = [
        'hmm_flow',
        'project_map',
        'matrix_editor',
        'network',
        'comparative',
        'lexical',
        'crosstab',
        'findings',
        'json',
      ];
      
      const tabToUse = validTabs.includes(initialTab) ? initialTab : 'hmm_flow';
      if (tabToUse !== activeTab) {
        setActiveTab(tabToUse);
      }

      window.history.replaceState(
        { tab: tabToUse, isRoot: tabToUse === 'hmm_flow' },
        '',
        window.location.pathname + '#' + tabToUse
      );
    } catch (e) {
      console.warn('History state init error:', e);
    }
  }, []);

  // Push history state whenever activeTab changes by user interaction
  const prevTabRef = useRef<MainTabType>(activeTab);
  useEffect(() => {
    if (isFromPopstateRef.current) {
      isFromPopstateRef.current = false;
      prevTabRef.current = activeTab;
      return;
    }

    if (prevTabRef.current !== activeTab) {
      try {
        window.history.pushState(
          { tab: activeTab, isRoot: activeTab === 'hmm_flow' },
          '',
          window.location.pathname + '#' + activeTab
        );
      } catch (e) {
        console.warn('History pushState error:', e);
      }
      prevTabRef.current = activeTab;
    }
  }, [activeTab]);

  // Push history state for sidebar drawer opening
  const prevSidebarRef = useRef(mobileSidebarOpen);
  useEffect(() => {
    if (isFromPopstateRef.current) {
      prevSidebarRef.current = mobileSidebarOpen;
      return;
    }

    if (!prevSidebarRef.current && mobileSidebarOpen) {
      try {
        window.history.pushState(
          { tab: activeTab, overlay: 'sidebar' },
          '',
          window.location.pathname + '#sidebar'
        );
      } catch (e) {
        console.warn('History sidebar push error:', e);
      }
    }
    prevSidebarRef.current = mobileSidebarOpen;
  }, [mobileSidebarOpen, activeTab]);

  // Push history state for profile drawer or node detail opening
  const hasDetailOpen = Boolean(profileDrawerOpen || selectedNodeData || selectedInformantId);
  const prevDetailRef = useRef(hasDetailOpen);
  useEffect(() => {
    if (isFromPopstateRef.current) {
      prevDetailRef.current = hasDetailOpen;
      return;
    }

    if (!prevDetailRef.current && hasDetailOpen) {
      try {
        window.history.pushState(
          { tab: activeTab, overlay: 'detail' },
          '',
          window.location.pathname + '#detail'
        );
      } catch (e) {
        console.warn('History detail push error:', e);
      }
    }
    prevDetailRef.current = hasDetailOpen;
  }, [hasDetailOpen, activeTab]);

  // Global popstate event listener for mobile & browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const {
        activeTab: currentTab,
        mobileSidebarOpen: currentSidebar,
        profileDrawerOpen: currentProfile,
        selectedNodeData: currentNode,
        selectedInformantId: currentInformant,
      } = stateRef.current;

      isFromPopstateRef.current = true;

      // 1. If mobile sidebar is open, close it first
      if (currentSidebar) {
        setMobileSidebarOpen(false);
        return;
      }

      // 2. If profile drawer, selected node, or informant modal is open, close them
      if (currentProfile || currentNode || currentInformant) {
        setProfileDrawerOpen(false);
        setSelectedNodeData(null);
        setSelectedInformantId(null);
        return;
      }

      // 3. If currently on a sub-tab (not 'hmm_flow' main dashboard)
      if (currentTab !== 'hmm_flow') {
        const stateTab = event.state?.tab as MainTabType | undefined;
        if (stateTab && stateTab !== currentTab) {
          setActiveTab(stateTab);
        } else {
          // Fallback: return to Dashboard Utama (hmm_flow)
          setActiveTab('hmm_flow');
        }
        return;
      }

      // 4. If already on Main Dashboard ('hmm_flow') with nothing open:
      // Prevent accidental exit with double-back confirmation on mobile
      if (exitTimerRef.current) {
        // Second press within time limit: allow natural browser exit
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
        setShowExitToast(false);
      } else {
        // First press: re-push state and show exit toast notification
        try {
          window.history.pushState(
            { tab: 'hmm_flow', isRoot: true },
            '',
            window.location.pathname + '#hmm_flow'
          );
        } catch (e) {
          console.warn('History re-push error:', e);
        }

        setShowExitToast(true);
        exitTimerRef.current = setTimeout(() => {
          setShowExitToast(false);
          exitTimerRef.current = null;
        }, 2500);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [
    setActiveTab,
    setMobileSidebarOpen,
    setProfileDrawerOpen,
    setSelectedNodeData,
    setSelectedInformantId,
  ]);

  // Programmatic helper to go back to previous screen or main dashboard
  const handleGoBack = useCallback(() => {
    const {
      activeTab: currentTab,
      mobileSidebarOpen: currentSidebar,
      profileDrawerOpen: currentProfile,
      selectedNodeData: currentNode,
      selectedInformantId: currentInformant,
    } = stateRef.current;

    if (currentSidebar) {
      setMobileSidebarOpen(false);
      return;
    }

    if (currentProfile || currentNode || currentInformant) {
      setProfileDrawerOpen(false);
      setSelectedNodeData(null);
      setSelectedInformantId(null);
      return;
    }

    if (currentTab !== 'hmm_flow') {
      try {
        window.history.back();
      } catch {
        setActiveTab('hmm_flow');
      }
    }
  }, [
    setActiveTab,
    setMobileSidebarOpen,
    setProfileDrawerOpen,
    setSelectedNodeData,
    setSelectedInformantId,
  ]);

  const handleReturnToMainDashboard = useCallback(() => {
    setMobileSidebarOpen(false);
    setProfileDrawerOpen(false);
    setSelectedNodeData(null);
    setSelectedInformantId(null);
    setActiveTab('hmm_flow');
  }, [
    setActiveTab,
    setMobileSidebarOpen,
    setProfileDrawerOpen,
    setSelectedNodeData,
    setSelectedInformantId,
  ]);

  return {
    showExitToast,
    handleGoBack,
    handleReturnToMainDashboard,
    isAtMainDashboard: activeTab === 'hmm_flow' && !mobileSidebarOpen && !profileDrawerOpen && !selectedNodeData && !selectedInformantId,
  };
}
