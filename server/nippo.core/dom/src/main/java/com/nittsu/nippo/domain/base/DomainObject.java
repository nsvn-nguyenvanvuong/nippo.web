package com.nittsu.nippo.domain.base;

/**
 * Base interface of domain objects (Entity, ValueObject)
 */
public abstract class DomainObject implements IValidatable {
	@Override
	public void validate() {
	}
}