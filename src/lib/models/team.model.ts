export enum TeamMemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
  GUEST = 'guest'
}

export enum TeamVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  ORGANIZATION = 'organization'
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  
  // Team details
  visibility: TeamVisibility;
  organizationId?: string;
  createdAt: Date;
  updatedAt?: Date;
  
  // Membership
  ownerId: string;
  members: TeamMember[];
  invites?: TeamInvite[];
  
  // Settings
  settings?: {
    defaultMemberRole: TeamMemberRole;
    membersCanInvite: boolean;
    requiresApproval: boolean;
    defaultWorkspaceId?: string;
  };
  
  // Resources
  workspaceIds: string[];
  sharedResourceIds?: string[];
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: TeamMemberRole;
  joinedAt: Date;
  invitedBy?: string;
  permissions?: string[];
  status: 'active' | 'inactive' | 'suspended';
}

export interface TeamInvite {
  id: string;
  teamId: string;
  email: string;
  role: TeamMemberRole;
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  acceptedAt?: Date;
  message?: string;
}
