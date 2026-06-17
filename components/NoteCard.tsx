import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Note } from '../types/Note';

type Props = {
  note: Note;
  onDelete: () => void;
  onEdit: () => void;
  onToggleFavorite: () => void;
};

// Colour constants
const GREY  = '#9ca3af';  // default icon colour
const GREEN = '#4CAF50';  // active favourite colour

function NoteCard({ note, onDelete, onEdit, onToggleFavorite }: Props) {

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onEdit}
      activeOpacity={0.85}
    >
      {/* Title */}
      <Text style={styles.title}>{note.title}</Text>

      {/* Content preview */}
      <Text style={styles.content} numberOfLines={3}>
        {note.content}
      </Text>

      {/* Sync status + date */}
      <Text style={styles.meta}>
        {note.syncStatus === 'synced'
          ? '☁️ Synced'
          : note.syncStatus === 'failed'
          ? '⚠️ Sync failed'
          : '🕐 Pending sync'}
        {'  ·  '}
        {new Date(note.updatedAt).toLocaleDateString()}
      </Text>

      {/* Bottom-right icons */}
      <View style={styles.actionRow}>

        {}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={(e) => { e.stopPropagation(); handleDelete(); }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../assets/trash-bin.png')}
            style={[styles.icon, { tintColor: GREY }]}
          />
        </TouchableOpacity>

        {/* ── Heart / Favourite icon ── */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../assets/heart.png')}
            style={[
              styles.icon,
              { tintColor: note.isFavorite ? GREEN : GREY },
            ]}
          />
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 10,
  },
  meta: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 10,
  },
  iconButton: {
    padding: 4,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default NoteCard;

