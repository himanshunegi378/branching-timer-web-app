import { describe, it, expect, vi } from 'vitest';
import { ComponentRegistry } from './ComponentRegistry';
import { Event } from './Event';
import React from 'react';

describe('ComponentRegistry', () => {
  const mockComponent1 = () => React.createElement('div', null, 'Comp1');
  const mockComponent2 = () => React.createElement('div', null, 'Comp2');

  it('should return empty list and warn if tag not found', () => {
    const eventBus = new Event();
    const registry = new ComponentRegistry(eventBus);
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const components = registry.getComponents('non-existent');
    expect(components).toEqual([]);
    expect(consoleWarnSpy).toHaveBeenCalled();
    
    consoleWarnSpy.mockRestore();
  });

  it('should register and retrieve components', () => {
    const eventBus = new Event();
    const registry = new ComponentRegistry(eventBus);
    registry.register('test-tag', 'id-1', mockComponent1);

    const components = registry.getComponents('test-tag');
    expect(components).toHaveLength(1);
    expect(components[0]).toBe(mockComponent1);
  });

  it('should return referentially stable arrays (cached)', () => {
    const eventBus = new Event();
    const registry = new ComponentRegistry(eventBus);
    registry.register('test-tag', 'id-1', mockComponent1);

    const components1 = registry.getComponents('test-tag');
    const components2 = registry.getComponents('test-tag');
    expect(components1).toBe(components2); // same array reference
  });

  it('should invalidate cache on new registration', () => {
    const eventBus = new Event();
    const registry = new ComponentRegistry(eventBus);
    registry.register('test-tag', 'id-1', mockComponent1);

    const components1 = registry.getComponents('test-tag');
    
    // Registering another component should invalidate the cache
    registry.register('test-tag', 'id-2', mockComponent2);
    const components2 = registry.getComponents('test-tag');

    expect(components1).not.toBe(components2); // different array reference
    expect(components2).toHaveLength(2);
    expect(components2).toContain(mockComponent1);
    expect(components2).toContain(mockComponent2);
  });

  it('should invalidate cache on deregister', () => {
    const eventBus = new Event();
    const registry = new ComponentRegistry(eventBus);
    registry.register('test-tag', 'id-1', mockComponent1);
    registry.register('test-tag', 'id-2', mockComponent2);

    const components1 = registry.getComponents('test-tag');

    // Deregistering one component should invalidate cache
    registry.deregister('test-tag', 'id-1');
    const components2 = registry.getComponents('test-tag');

    expect(components1).not.toBe(components2); // different array reference
    expect(components2).toHaveLength(1);
    expect(components2[0]).toBe(mockComponent2);
  });

  it('should emit events on register and deregister', () => {
    const eventBus = new Event();
    const registry = new ComponentRegistry(eventBus);
    const emitSpy = vi.spyOn(eventBus, 'emit');

    registry.register('test-tag', 'id-1', mockComponent1);
    expect(emitSpy).toHaveBeenCalledWith('componentRegistry/registered/test-tag', 'id-1', mockComponent1);

    registry.deregister('test-tag', 'id-1');
    expect(emitSpy).toHaveBeenCalledWith('componentRegistry/deRegistered/test-tag', 'id-1');
  });
});
