import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '@/theme/useTheme'

interface ActivityItemProps {
  title: string
  description: string
  time: string
  icon: string
  onPress?: () => void
}

export function ActivityItem({ title, description, time, icon, onPress }: Readonly<ActivityItemProps>) {
  const theme = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.surface,
          shadowColor: theme.onSurface,
        },
        pressed && { opacity: 0.8 },
      ]}
      hitSlop={8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${description}`}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.surfaceVariant }]}>
        <Text style={[styles.icon, { color: theme.primary }]}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.onSurface }]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.description, { color: theme.onSurfaceVariant }]} numberOfLines={1}>
          {description}
        </Text>
      </View>

      <View style={styles.rightContent}>
        <Text style={[styles.time, { color: theme.onSurfaceVariant }]}>{time}</Text>
        <Text style={[styles.chevron, { color: theme.outline }]}>›</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
  rightContent: {
    alignItems: 'flex-end',
    gap: 2,
  },
  time: {
    fontSize: 12,
    lineHeight: 16,
  },
  chevron: {
    fontSize: 20,
    fontWeight: '300',
  },
})